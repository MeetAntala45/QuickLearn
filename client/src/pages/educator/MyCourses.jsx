
import React, { useContext, useEffect } from 'react'
import { AppContext } from '../../context/AppContext';
import Loading from '../../components/student/Loading';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyCourses = () => {

  const { currency, BACKEND_URL, isEducator, getToken } = useContext(AppContext);

  const [courses, setCourses] = React.useState(null);

    const fetchEducatorCourses = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get(`${BACKEND_URL}/api/educator/courses`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      if (data.success) {
        setCourses(data.courses);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    if (isEducator) {
      fetchEducatorCourses();
    }
  }, [isEducator]);

  return courses ? (
    <div className='h-screen flex flex-col items-center justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0'>
      <div className='w-full'>
        <h2 className='pb-4 text-lg font-medium'>My Courses</h2>
        <div className='flex flex-col items-center max-w-4xl w-full overflow-auto rounded-md bg-white border border-gray-500/20'>
          <table className='md:table-auto table-fixed w-full overflow-auto'>
            <thead className='text-gray-900 border-b border-gray-500/20 text-sm text-left'>
              <tr>
                <th className='px-4 py-3 font-semibold truncate'>All Courses</th>
                <th className='px-4 py-3 font-semibold truncate'>Earnings</th>
                <th className='px-4 py-3 font-semibold truncate'>Students</th>
                <th className='px-4 py-3 font-semibold truncate'>Published On</th>
              </tr>
            </thead>

            <tbody className='text-sm text-gray-500'>
              {courses.map((course, index) => (
                <tr key={index} className='border-b border-gray-500/20 hover:bg-gray-50'>
                  <td className='px-4 py-3 font-medium truncate flex items-center space-x-3 '>
                    <img src={course.courseThumbnail} alt="course_image" className='w-12 md:w-16' />
                    <span className='truncate hidden md:block'>
                      {course.courseTitle}
                    </span>
                  </td>
                  <td className='px-4 py-3'>{currency}{Math.floor(course.enrolledStudents.length * (course.coursePrice - course.discount * course.coursePrice / 100))}</td>
                  <td className='px-4 py-3'>{course.enrolledStudents.length}</td>
                  <td className='px-4 py-3'>{new Date(course.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) :
    <Loading />
}

export default MyCourses
