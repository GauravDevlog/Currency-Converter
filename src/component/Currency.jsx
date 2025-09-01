import React, { useEffect, useState } from 'react'

function Currency() {
  const [currency,setCurrency] = useState("USD")
  const [list,setList] = useState([])
  const [rates,setRates] = useState({})
  const url = `https://open.er-api.com/v6/latest/${currency}`
  const [current,setCurrent] = useState("USD")
  const [amount,setAmount] = useState(1)

  async function convert() {
    const res =  await fetch(url).then((res)=>res.json())
    const rates = res.rates 
    setList(Object.keys(rates))
    setRates(rates)
  }
  // console.log("This from ",rates)

  useEffect(()=>{
    convert()
  },[currency])
  
  return (
    <div
    className='border bg-yellow-600 m-auto text-center w-[100vw] h-[100vh]
    flex flex-col justify-center items-center '
    >
      <div
        className='border w-[40vw] p-5 bg-amber-700'

      >
    <h1
    className='text-4xl mb-5 mt-5 underline uppercase'
    >Currency Converter</h1>

    <div 
    className='text-2xl flex  flex-col justify-center'
    >
        <label htmlFor="input"
        className='underline uppercase'
        >Base Currency</label>
    <select name="currency" id="input" 
    className='w-[10vw] border'
    onChange={(e)=>setCurrency(e.target.value)}
    >
        {/* <option value="none">None</option> */}
        {list.map((cur)=>(
          <option
          className='border-amber-300 '
          value={cur} key={cur}>{cur}</option>
        ))}


    </select>
    <input 
    type="text"
    placeholder='Base Currency'
    className='border w-[100%] mt-5'
    value={amount}
    onChange={(e)=>setAmount(e.target.value)}
    />
    <label htmlFor='output'
     className='underline uppercase'
    >Target Currency</label>
    <select name="target" id="output"
    className='w-[10vw] border'
    onChange={(e)=>setCurrent(e.target.value)}
    >
        {list.map((cur)=>(
          <option 
          className='border'
          value={cur} key={cur}
          >{cur}</option>
        ))}
    </select>
        <input 
        type="text"
        placeholder='Target Currency'
        className='border w-[100%] mt-5'
        value={current && rates[current]?amount*rates[current]:""}
        readOnly
        />
    </div>
    </div>
    </div>
  )
}

export default Currency