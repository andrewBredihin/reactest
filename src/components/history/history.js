function History() {

    var itemsNoSort =[];
    for (var i=0; i < localStorage.length; i++){
        var key = localStorage.key(i);
        itemsNoSort.push(JSON.parse(localStorage.getItem(key)));
    }
    const items = itemsNoSort.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
    
    return (
        <div>
            <ul className="newsList">
                {
                    items.length!==0 ?
                        items.map(item => (
                            <li>
                                <p className="postUrl"><a className="newLink" href={item.href}>{item.title}</a></p>
                                <p>Дата публикации: {item.date}</p>
                                <hr/>
                            </li>
                        ))
                        :
                        <div className="aboutDiv">
                            <h1>Вы еще не просматривали новости</h1>
                        </div>
                }
            </ul>
        </div>
    );
}

export default History;