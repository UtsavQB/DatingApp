import { useForm } from "react-hook-form";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Select from 'react-select'
import countryList from 'react-select-country-list'
import React, { useState, useMemo } from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'



function Phone() {
  const [value, setValue] = useState('')
  const options = useMemo(() => countryList().getData(), [])
  console.log(value, "valuevaluevalue");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const changeHandler = value => {
    setValue(value)
  }
  console.log(value, "valuevalue")

  return (
    <>
      <div className="mb-6 flex items-center">
        <label className="block text-gray-700 w-20" htmlFor="phoneNumber">
          phone Number:
        </label>
        <div className="flex-1">
          {/* <div className="flex items-center border rounded-lg overflow-hidden"> */}

            <PhoneInput
              className={`border-0 flex w-full px-4 text-gray-700 focus:outline-none focus:ring-2 transition ${errors.phoneNumber
                ? "border-red-500 focus:ring-red-300"
                : "focus:ring-pink-200"
                }`}
              placeholder="phone Number"
              containerStyle={{ width: 'auto' }}

              country={'in'}
              // value={value}
              onChange={phone => console.log({ phone })}
            />

          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

      {/* </div> */}

    </>
  )
}


export default Phone;
