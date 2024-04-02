import { useState, useRef } from 'react'
import { Article } from './Article';
import { useQuery } from '@tanstack/react-query';
import { getArticles } from '../../api/api';

export const Home = () => {

  const [query, setQuery] = useState('')
  const [difficulty, setDifficulty] = useState('')
  const [time, setTime] = useState(0)
  const [topic, setTopic] = useState('')
  const difficultyRef = useRef()
  const timeRef = useRef()
  const topicRef = useRef()

  console.log(time);

  const handleTopicChange = (e) => {
    setTopic(e.target.value);
  }

  const handleTimeChange = (e) => {
    const value = e.target.value
    setTime(JSON.parse(value));
  }

  const handleDifficultyChange = (e) => {
    setDifficulty(e.target.value);
  }

  const handleClearFilters = () => {
    setQuery('')
    setTopic('')
    setTime(0)
    setDifficulty('')
    topicRef.current.value = ''
    timeRef.current.value = 0
    difficultyRef.current.value = ''
  }


  const { data: articles, status, error } = useQuery({
    queryKey: ['articles'],
    queryFn: getArticles
  })

  if (status === 'loading') return <h1>Loading</h1>
  if (status === 'error') return <h1>{JSON.stringify(error)}</h1>



  const transformArticles = () => {
    let filterArticles = articles?.data

    if (query) {
      filterArticles = filterArticles?.filter(item => item.title.toLowerCase().includes(query))
    }
    if (difficulty) {
      filterArticles = filterArticles?.filter(item => item.languageLevel === difficulty)
    }
    if (time.length) {
      filterArticles = filterArticles?.filter(item => item.minutesReading > time[0] && item.minutesReading < time[1])
    }
    if (topic) {
      filterArticles = filterArticles?.filter(item => item.topic === topic)
    }
    return filterArticles
  }

  return (
    <div className="w-full">
      <input className="w-full p-2 rounded-lg border border-solid border-gray-400 outline-none" type="text" value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder='Search articles' />
      <h1 className='text-3xl font-bold mt-8'>Articles</h1>
      <div className='flex'>
        <div>
          <div className='flex flex-wrap gap-5 mt-6'>

            {transformArticles()?.map((item, index) => (
              <Article title={item.title} id={item._id} image={item?.image} description={item.article} key={index} />
            ))}
          </div>
        </div>
        <div className='p-5 bg-white shadow-lg rounded-xl min-w-80 h-[500px]'>
          <p className="text-3xl font-bold">Filters</p>
          <div className="">
            <label htmlFor='language'>
              Difficulty
            </label>
            <select ref={difficultyRef} onChange={(e) => handleDifficultyChange(e)} name="language" id="language">
              <option value=''>Select language level</option>
              <option value='Beginner'>Beginner</option>
              <option value='Pre-intermediate'>Pre-intermediate</option>
              <option value='Intermediate'>Intermediate</option>
              <option value='Upper-intermediate'>Upper-intermediate</option>
              <option value='Advanced'>Advanced</option>
              <option value='Mastery'>Mastery</option>
            </select>
          </div>

          <div className="">
            <label htmlFor='time' name="time">
              Time of Reading
            </label>
            <select ref={timeRef} onChange={(e) => handleTimeChange(e)} name="time" id="time">
              <option value="0" >Select time</option>
              <option value="[0, 10]">0 - 10 minutes</option>
              <option value="[10, 15]">10 - 15 minutes</option>
              <option value="[15, 30]">15 - 30 minutes</option>
              <option value="[30, 10000000000]">&gt; 30 minutes</option>
            </select>
          </div>

          <div className="">
            <label htmlFor='topic' name="topic">
              Topic
            </label>
            <select ref={topicRef} onChange={(e) => handleTopicChange(e)} name="topic" id="topic">
              <option value=''>Select a topic</option>
              <option value='Health and Wellness'>Health and Wellness</option>
              <option value='Technology and Innovation'>Technology and Innovation</option>
              <option value='Travel and Adventure'>Travel and Adventure</option>
              <option value='Education and Learning'>Education and Learning</option>
              <option value='Business and Entrepreneurship'>Business and Entrepreneurship</option>
              <option value='Environment and Sustainability'>Environment and Sustainability</option>
              <option value='Arts and Culture'>Arts and Culture</option>
              <option value='Science and Discovery'>Science and Discovery</option>
              <option value='Relationships and Psychology'>Relationships and Psychology</option>
              <option value='Lifestyle and Self-Improvement'>Lifestyle and Self-Improvement</option>
            </select>
          </div>
          <button onClick={handleClearFilters}>
            Clear all filters
          </button>
        </div>
      </div>


    </div>
  )
}
