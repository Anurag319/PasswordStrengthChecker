import React, { useState } from "react";
import StrengthMeter from "./strength";

const Pdata = [
  {
    data: "Include Uppercase Letters",
    checked: "false"
  },
  {
    data: "Include LowercaseLetters",
    checked: "false"
  },
  {
    data: "Include Numbers",
    checked: "false"
  },
  {
    data: "Include Symbols",
    checked: "false"
  }
];

const Form = () => {
  const [userData, setUserData] = useState(Pdata);
  const [arr, setArray] = useState([false, false, false, false]);
  const [pwdInput, initValue] = useState({
    password: ""
  });
  const [isError, setError] = useState(null);
  const top = [];

  const onChange = (e) => {
    let password = e.target.value;
    initValue({
      ...pwdInput,
      password: e.target.value
    });
    setError(null);
    let caps, small, num, specialSymbol;
    caps = (password.match(/[A-Z]/g) || []).length;
    small = (password.match(/[a-z]/g) || []).length;
    num = (password.match(/[0-9]/g) || []).length;
    specialSymbol = (password.match(/\W/g) || []).length;

    let arr = [caps, small, num, specialSymbol];
    setUserData(
      userData.map((data, index) => {
        return arr[index] > 0 ? { ...data, checked: !data.checked } : { data };
      })
    );

    setArray(arr);
  };
  const [isStrong, initRobustPassword] = useState(null);
  const initPwdInput = async (childData) => {
    initRobustPassword(childData);
  };
  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      e.persist();
    } catch (error) {
      throw error;
    }
  };
  return (
    <div className="center">
      <form onSubmit={onSubmit}>
        <input
          type="password"
          id="password"
          name="password"
          onChange={onChange}
          required
        />
        <ul className="toppings-list">
          {Pdata.map((userData, index) => {
            return (
              <div className="c1" key={index}>
                <div className="c2">
                  <input
                    type="checkbox"
                    id={`custom-checkbox-${index}`}
                    name={userData.data}
                    value={userData.data}
                    checked={arr[index]}
                  />
                  <label htmlFor={`custom-checkbox-${index}`}>
                    {userData.data}
                  </label>
                </div>
              </div>
            );
          })}
        </ul>

        <StrengthMeter password={pwdInput.password} actions={initPwdInput} />
      </form>
    </div>
  );
};
export default Form;
