import React, { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';

function New() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [item, setItems] = useState(null);
    const { id } = useParams();
    const [outputItems, setOutputItems] = useState([]);
    let query ="";
    let sameIt=[];


    useEffect(() => {
        fetch("https://api.spaceflightnewsapi.net/v3/articles/"+id)
            .then(res => res.json())
            .then(
                (result) => {
                    const a = {
                        'title': result.title,
                        'href': result.url,
                        'date': parseISOString(new Date().toUTCString())
                    };
                    checkHistore(a);

                    setIsLoaded(true);
                    setItems(result);
                    sameIt = result.title.split(" ");
                    fetchSame();
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [id,false])

    function parseISOString(s) {
        var dateStr = s.slice(0, -5);
        return new Date(dateStr).toUTCString();
    }


    function checkHistore(a){
        var bool = false;
        var item;
        for (var i=0; i < localStorage.length; i++){
            var key = localStorage.key(i);
            item = JSON.parse(localStorage.getItem(key));
            if (item.date === a.date && item.title === a.title)
                bool = true;
        }
        if (!bool)
            localStorage.setItem((localStorage.length+1).toString(), JSON.stringify(a));
    }

    function fetchSame(){
        sameIt.forEach(element =>
            element.length>3 && element.toLowerCase()!=="space" ?
                query = query+"&title_contains="+element : ""
        );
        fetch("https://api.spaceflightnewsapi.net/v3/articles?"+query)
            .then(ress => ress.json())
            .then(
                (results) => {
                    setIsLoaded(true);
                    setOutputItems(results);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            );
    }

    if (error) {
        return <div>????????????: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>????????????????...</div>;
    } else {
        return (
            <div>
                <ul className="newsList">
                    <li key={item.id}>
                        <p className="newsTitle" id="newsTitle">{item.title}</p>
                        <p><img className="newImage" src={item.imageUrl} alt="newImage"/></p>
                        <p className="newSummary" id="postSummary">{item.summary}</p>
                        <p className="postUrl">???????????? ???? ????????????????: <a className="newLink" href={item.url}>{item.url}</a></p>
                        <p>???????? ????????????????????: {parseISOString(item.publishedAt)}</p>
                    </li>
                </ul>
                <hr/>
                <p/>
                <label className="sameNewsLbl" id="sameNewsLbl">?????????????? ????????????:</label>
                <p/>
                <hr/>
                <div>
                    <ul className="newsList">
                        {outputItems.map(itemS => (item.id!==itemS.id ?
                            <li key={itemS.id}>
                                <p id="newsTitle"><NavLink className="newTitleLink" id="headerNews" to={"/news/"+itemS.id}>{itemS.title}</NavLink></p>
                                <p><img className="postImage" src={itemS.imageUrl} alt="newImage"/></p>
                                <p>???????? ????????????????????: {parseISOString(itemS.publishedAt)}</p>
                                <hr />
                            </li>
                            :""))}
                    </ul>
                </div>
            </div>
        );
    }
}

export default New;