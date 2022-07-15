import React from 'react'

export const RenderSelect = ({value , name , className, text, options, errors , touched, handleChange, handleBlur}) => {
  return (
    <div>
    <select value={value} name={name} onChange={handleChange} onBlur={handleBlur} className={className}>
        <option value="">{text}</option>
        {options.map((val , i) => (
            <option key={i} value={val.value}>{val.text}</option>
        ))}  
    </select>
    {errors && touched && <span className='error'>{errors}</span>}
</div>
  )
}
