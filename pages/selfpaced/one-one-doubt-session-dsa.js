import { useState, useEffect } from "react";
import Head from "next/head";
import { FaFlag } from "react-icons/fa";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import DatePicker from "react-datepicker";
import { setHours, setMinutes, addDays, subDays, getDay } from "date-fns";
import { isSaturday } from "date-fns";

const countries = [
  { value: "US", label: "United States (+1)", icon: <FaFlag /> },
  { value: "GB", label: "United Kingdom (+44)", icon: <FaFlag /> },
  // Add more countries as needed
];

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    startDate: "",
    endDate: "",
  });

  const [startDate, setStartDate] = useState(new Date());

  const [formActive, setFormActive] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  useEffect(() => {
    setFormData({ ...formData, dateTime: startDate });
  }, [startDate]);
  const isWeekday = (date) => {
    const day = getDay(date);
    return day !== 0;
  };
  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  const handlePhoneChange = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      phoneNumber: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Log the form data to the console
    console.log("Form Data:", formData);

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    fetch("https://getform.io/f/pbnrorgb", {
      method: "POST",
      body: formDataToSend,
    }).then(() =>
      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        startDate: "",
        endDate: "",
      })
    );
    alert("Form submitted successfully!");
  };

  const handleInputFocus = () => {
    setFormActive(true);
  };

  const handleInputBlur = () => {
    setFormActive(false);
  };
  const filterDate = (date) => {
    // Enable all Saturdays and disable other days
    return isSaturday(date);
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <Head>
        <title>Book a Live Doubt Session - Skillslash</title>
        <meta
          name="description"
          content="Register for a 1:1 live doubt-clearing session with Skillslash."
        />
        <meta name="robots" content="noindex,follow" />
      </Head>
      <h2 className="text-center m-10">Live Doubt Session registration form</h2>
      <p className="w-[50%] text-center max-sm:w-[98%]">
        Trainer led Live Doubt clearing session is available every Saturday from
        12PM to 2PM. Please use your registered email id to fill up the form
      </p>
      <div
        className={`d-flex justify-center max-w-md mx-4 bg-white rounded-lg overflow-hidden shadow-lg ${
          formActive ? "form-active" : ""
        }`}
      >
        <form onSubmit={handleSubmit} className="px-6 py-4">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              required
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              required
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="phoneNumber"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Phone Number:
            </label>
            <PhoneInput
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Enter phone number"
              value={formData.phoneNumber}
              onChange={handlePhoneChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              defaultCountry="IN"
              required
            />
          </div>
          <div className="flex flex-row justify-between items-center gap-2 max-sm:flex-col">
            <div className="mb-4">
              <label
                htmlFor="dateTime"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Select Date
              </label>
              {/* <input 
            type="date" 
            id="startDate" 
            name="startDate" 
            value={formData.startDate} 
            onChange={handleChange} 
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            required 
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            min={getNextSaturday()} // Set the minimum allowed date to the next Saturday
            max={getNextSaturday()} // Set the maximum allowed date to the next Saturday
         
         /> */}
              <div className="w-full border-[1px] border-solid  rounded px-2 py-1">
                <DatePicker
                  selected={startDate}
                  name="dateTime"
                  id="dateTime"
                  onChange={(date) => setStartDate(date)}
                  timeIntervals={15}
                  // includeDateIntervals={[
                  //   {
                  //     start: subDays(new Date(), 1),
                  //     end: addDays(new Date(), 5),
                  //   },
                  // ]}
                  filterDate={filterDate} // use the custom function for filtering
                  filterTime={filterPassedTime}
                  dateFormat="MMMM d, yyyy"
                  required
                  popperPlacement="top"
                  popperModifiers={[
                    {
                      name: "offset",
                      options: {
                        offset: [5, 10],
                      },
                    },
                    {
                      name: "preventOverflow",
                      options: {
                        rootBoundary: "viewport",
                        tether: false,
                        altAxis: true,
                      },
                    },
                  ]}
                  style={{ width: "100% !important" }}
                  minTime={setHours(setMinutes(new Date(), 0), 15)} // Set minimum time to
                  maxTime={setHours(setMinutes(new Date(), 0), 17)} // Set maximum time to 5:00 PM
                />
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="dateTime"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Time
              </label>
              <input
                readOnly
                placeholder="12PM to 2PM"
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
