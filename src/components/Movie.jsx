import { useState } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { UserAuth } from '../context/AuthContext'
import { db } from '../firebase'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'

const Movie = ({item}) => {

    const [like, setLike] = useState(false)
    const [saved, setSaved] = useState(false)
    const {user} = UserAuth()

    const movieID = doc(db, 'users', `${user?.email}`)

    const saveShow = async () => {
        if(user?.email) {
            setLike(!like)
            setSaved(true)
            await updateDoc(movieID, {
                savedShows: arrayUnion({
                    id: item.id,
                    title: item.title,
                    img: item.backdrop_path
                })
            })
        } else {
            alert('Please log in to make your favorite list')
        }
    }

    const truncateString = (str, num) => {
        if (str?.length > num) {
            return str.slice(0, num) +'...'
        } else {
            return str
        }
      }

  return (
    <div className='w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative mx-4 rounded-lg'>
        <img
            className='w-full h-auto block rounded-lg'
            src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`}
            alt={item?.title}
        />
        <div className='absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white rounded-lg'>
            <p className='white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center'>
                {truncateString((item?.title),40)}
            </p>
            <p onClick={saveShow}>
                {like ? (<FaHeart className='absolute left-4 top-4 text-red-600' />)
                : (<FaRegHeart className='absolute left-4 top-4 text-gray-300' />)}
            </p>
        </div>
    </div>
  )
}

export default Movie