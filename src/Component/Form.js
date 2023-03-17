import React, { useState } from 'react'
import { BsJournalPlus, BsPlusCircleDotted, BsExclamationTriangle, BsCheckCircle } from "react-icons/bs";



function Form({ inputText, setInputText, todos, setTodos, setStatus }) {
    const [alertWarning, setAlertWarning] = useState(false);  //! başlangıçta gözükmemesi için false yazdık
    const [alertSuccess, setAlertSuccess] = useState(false);




    //! input değerini setInputText 'e atar
    const inputTextHandler = (e) => {
        setInputText(e.target.value)
    };
    const statusHandler = (e) => {          //! setStatus e value değerlerini atıyor
        setStatus(e.target.value)
    };


    const submitTodoHandler = (e) => {
        e.preventDefault();                 //! butona tıklandığında sayfa yenileme yapmaz
        const isEmpty = str => !str.trim().length;  //! input text boş ise str parametresi gönderip str trim() boşlukları alıyor
        if (isEmpty(inputText)) {
            setAlertWarning(true);          //! input text boş ise alertwarning true yapıyor
            setTimeout(() => {
                setAlertWarning(false);
            }, 2500);
        } else {
            setAlertSuccess(true);          //! input text boş değil ise alertsuccess true yapıyor
            setTimeout(() => {
                setAlertSuccess(false);
            }, 1500);
            setTodos([                          //! setTodos arrayi(dizini) oluşturur
                ...todos,                       //! ...todos'un hepsini alır
                { text: inputText, completed: false, id: Math.random() }      //! inputText verisinden text, false değerli completed ve random id no oluşşturur
            ]);
        }

        setInputText("")                     //! input içeriğini temizler
    }






    return (
        <div className='form'>
            <div className="input-group mb-3 todo-input">
                <button className="btn btn-todo">
                    <BsJournalPlus></BsJournalPlus>
                </button>
                <input value={inputText}
                    type="text"
                    className="form-control input-text"
                    placeholder="Görev yaz..."
                    onChange={inputTextHandler}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            submitTodoHandler();
                        }
                    }}></input>
                <button className="btn btn-info add-button" type='submit' onClick={submitTodoHandler}>EKLE
                    <BsPlusCircleDotted></BsPlusCircleDotted>
                </button>
            </div>

            <div className="popup-alert">
                {alertWarning ? <div className="alert alert-danger d-flex align-items-center" role="alert">
                    <BsExclamationTriangle className='me-2'></BsExclamationTriangle>
                    <div>Boş Görev Oluşturamazsınız !</div>
                </div> : ""}
                {alertSuccess ? <div className="alert alert-success d-flex align-items-center" role="alert">
                    <BsCheckCircle className='me-2'></BsCheckCircle>
                    <div>Görev Başarı ile Eklendi.</div>
                </div> : ""}
            </div>

            <div className="select">
                <select className="form-select" onChange={statusHandler}>
                    <option value="all">Hepsi</option>
                    <option value="uncompleted">Yapılacaklar</option>
                    <option value="completed">Tamamlananlar</option>
                </select>
            </div>
        </div>

    )
}

export default Form