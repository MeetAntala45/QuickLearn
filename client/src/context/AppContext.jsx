import { useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";
import { useAuth, useUser } from "@clerk/clerk-react";
import { toast } from "react-toastify";
import axios from "axios";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();

  const { getToken } = useAuth();
  const { user } = useUser();

  const [allCourses, setAllCourses] = useState([]);
  const [isEducator, setIsEducator] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [userData, setUserData] = useState(null);

  //fetch all courses

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const fetchAllCourses = async () => {
    try {
      const { data } = await axios(`${BACKEND_URL}/api/course/all`);

      if (data.success) {
        setAllCourses(data.courses);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  //const fetch user data
  const fetchUserData = async () => {
    if (user.publicMetadata.role == "educator") {
      setIsEducator(true);
    }
    try {
      const token = await getToken();
      const { data } = await axios.get(`${BACKEND_URL}/api/user/data`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.success) {
        setUserData(data.user);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  //Function to calculate average rating of course

  const calculateRating = (course) => {
    if (course.courseRatings.length === 0) {
      return 0;
    }
    let totalRating = 0;
    course.courseRatings.forEach((rating) => {
      totalRating += rating.rating;
    });
    return Math.floor(totalRating / course.courseRatings.length);
  };

  // Function to calculate course chapter time
  const calculateChapterTime = (chapter) => {
    let time = 0;
    chapter.chapterContent.map((lecture) => (time += lecture.lectureDuration));
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };

  //Function to claculate course duration
  const calculateCourseDuration = (course) => {
    let time = 0;
    course.courseContent.map((chapter) =>
      chapter.chapterContent.map((lecture) => (time += lecture.lectureDuration))
    );
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };

  // Function to calculate No of lectures in the course
  const calculateNoofLectures = (course) => {
    let totalLectures = 0;
    course.courseContent.forEach((chapter) => {
      if (Array.isArray(chapter.chapterContent)) {
        totalLectures += chapter.chapterContent.length;
      }
    });
    return totalLectures;
  };

  //fetch user enrolled courses
  const fetchUserEnrolledCourses = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get(
        `${BACKEND_URL}/api/user/enrolled-courses`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.success) {
        setEnrolledCourses(data.enrolledCourses.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllCourses();
  }, []);

  const value = {
    currency,
    allCourses,
    navigate,
    calculateRating,
    isEducator,
    setIsEducator,
    calculateChapterTime,
    calculateCourseDuration,
    calculateNoofLectures,
    enrolledCourses,
    setEnrolledCourses,
    fetchUserEnrolledCourses,
    BACKEND_URL,
    userData,
    setUserData,
    getToken,
    fetchAllCourses,
  };

  useEffect(() => {
    if (user) {
      fetchUserData();
      fetchUserEnrolledCourses();
    }
  }, [user]);

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
