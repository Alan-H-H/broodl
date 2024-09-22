'use client'
import { gradients, baseRating } from '@/utils/index'
import { Fugaz_One } from 'next/font/google'
import React,{useState} from 'react'


const months = { 'January': 'Jan', 'February': 'Feb', 'March': 'Mar', 'April': 'Apr', 'May': 'May', 'June': 'Jun', 'July': 'Jul', 'August': 'Aug', 'September': 'Sept', 'October': 'Oct', 'November': 'Nov', 'December': 'Dec' }
const monthsArr = Object.keys(months)
const now = new Date()
const dayList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const fugaz = Fugaz_One ({ subsets: ['latin'], weight: ['400']})



export default function Calendar(props) {
  const { demo, completeData, handleSetMood } = props
  const now = new Date()
  const currentMonth = now.getMonth()
  const [selectedMonth, setSelectMonth] = useState(Object.keys(months)[currentMonth])
  const[selectedYear, setSelectedYear] = useState(now.getFullYear())

  const numericMonth = monthsArr.indexOf(selectedMonth)
  const data = completeData?.[selectedYear]?.[numericMonth] || {}

  function handleIncrementMonth(val){
    //value +1 =1
    //if we hit the bounds of month, we can adjust the month
    if(numericMonth + val < 0){
      //set month value =11 and decrement year
      setSelectedYear(curr => curr - 1)
      setSelectMonth(monthsArr[monthsArr.length -1])
    } else if (numericMonth + val > 11){
      //set month val =0 and increment year
      setSelectedYear(curr => curr + 1)
      setSelectMonth(monthsArr[0])
    } else {
      setSelectMonth(monthsArr[numericMonth + val])
    }
  }
  
  const monthNow = new Date(selectedYear, Object.keys(months).indexOf(selectedMonth), 1)
  const firsDayOfMonth = monthNow.getDay()
  const daysInMonth = new Date(selectedYear, Object.keys(months).indexOf(selectedMonth) + 1, 0).getDate()

  const daysToDisplay = firsDayOfMonth + daysInMonth
  const numRows = (Math.floor(daysToDisplay /7)) + (daysToDisplay % 7 ? 1 : 0)

  return (
    <div className='flex flex-col gap-2'>
      <div className='grid grid-cols-5 gap-4'>
        <button onClick={()=>{handleIncrementMonth(-1)}}
        className='mr-auto text-indigo-400 text-lg sm:text-xl duration-200 hover:opacity-60'><i className='fa-solid fa-hand-point-left'></i></button>
        <p className={'text-center col-span-3 capitalized withespace-nowrap textGradient ' + fugaz.className}>{selectedMonth}, {selectedYear}</p>
        <button onClick={()=>{handleIncrementMonth(-1)}}
        className='ml-auto text-indigo-400 text-lg sm:text-xl hover:opacity-60'><i className='fa-solid fa-hand-point-right'></i></button>
      </div>
    <div className='flex flex-col overflow-hidden gap-1 p-3 py-4 sm:py-6 md:py-10'>
      {[...Array(numRows).keys()].map((row, rowIndex)=>{
        return(
          <div key={rowIndex} className='grid grid-cols-7 gap-1'>
            {dayList.map((dayOfWeek, dayOfWeekIndex)=>{

              let dayIndex = (rowIndex * 7) +
              dayOfWeekIndex - (firsDayOfMonth - 1)

              let dayDisplay = dayIndex > daysInMonth ?
              false : (row === 0 && dayOfWeekIndex < 
                firsDayOfMonth) ? false: true
              
              let isToday = dayIndex === now.getDate()

              if(!dayDisplay){
                return (
                  <div className='bg-white' key={dayOfWeekIndex} />
                )
              }

              let color = demo ?
              gradients.indigo[baseRating[dayIndex]] :
              dayIndex in data ? // Check if data is defined
              gradients.indigo[data[dayIndex]] :
              'white';

              return (
                <div style={{background: color}} className={'text-xs sm:text-sm border border-solid flex items-center gap-2 justify-between rounded-lg py-2 p-2 ' +
                 (isToday ? ' border-indigo-400': 'border-indigo-100') +
                 (color === 'white' ? ' text-indigo-400 ': ' text-white ') } key={dayOfWeekIndex}>
                  <p>{dayIndex}</p>
                </div>
              )
            })}
          </div>
        )
      })}
      
    </div>
    </div>
  )
}
