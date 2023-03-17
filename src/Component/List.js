import React, { useState, useEffect } from 'react'
import { BsTrash, BsCheck2Square, BsCheck2 } from "react-icons/bs";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';


function List({ text, todos, setTodos, todo }) {
    const [alertCompleted, setAlertCompleted] = useState(false);
    const [alertDelete, setAlertDelete] = useState(false);

    //! sil butona basınca idsi silinen ile eşit olmayanları göster 
    const deleteHandler = () => {
        setTodos(todos.filter((el) => el.id !== todo.id));
        setAlertDelete(true);
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setAlertDelete(false);
        }, 3000);

        return () => clearTimeout(timeoutId);
    }, [alertDelete]);

    //! todos içine map ile dön ve itema ulaş
    //! tıklanan item id ile todo id eşit ise
    //! gönder
    //! item'ın tüm içeriğini al. Completed değerini tersine çevir'
    //! son olarak değiştirilen item ı gönder

    const completeHandler = () => {
        setTodos(todos.map((item) => {
            if (item.id === todo.id) {
                return {
                    ...item, completed: !item.completed
                }
            };
            return item;

        }));
        if (todo.completed === false) {
            setAlertCompleted(true);
            setTimeout(() => {
                setAlertCompleted(false);
            }, 2000);
        }
    };




    //! eğer todo completed true ise( ? ) classa completed yaz. false ise (:) boş bırak
    return (
        <div>
            <div className={`todo ${todo.completed ? "completed" : ""}`}>
                <OverlayTrigger
                    placement="top"
                    delay={{ hide: 400 }}
                    overlay={<Tooltip id="button-completed">
                        Tamamlandı olarak işaretle
                    </Tooltip>}
                >
                    <button className="btn btn-completed" id="button-completed" type="button" onClick={completeHandler}>
                        <BsCheck2Square></BsCheck2Square>
                    </button>
                </OverlayTrigger>

                <li className="todo-text">{text}</li>
                <OverlayTrigger
                    placement="top"
                    delay={{ hide: 400 }}
                    overlay={<Tooltip id="button-delete">
                        Görevi Sil
                    </Tooltip>}
                >
                    <button className="btn btn-delete" type="button" id="button-delete" onClick={deleteHandler}>
                        <BsTrash></BsTrash>
                    </button>
                </OverlayTrigger>
            </div>
            <div className="popup-alert">
                {alertCompleted ? <div className="alert alert-primary d-flex align-items-center" role="alert">
                    <div><BsCheck2 className='me-2' />Görev Tamamlandı.</div>
                </div> : ""}
                {/* {alertDelete ? <div className="alert alert-danger d-flex align-items-center" role="alert">
                    <div>Görev Silindi</div>
                </div> : ""} */}

                {alertDelete && (
                    <div className="alert alert-danger d-flex align-items-center" role="alert">
                        Görev Silindi
                    </div>
                )}

            </div>
        </div>
    )
}

export default List