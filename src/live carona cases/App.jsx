import { useEffect, useState } from 'react';

let App = () => {
    const [covid, change] = useState();
    const [search, searchChange] = useState();
    const [local, lchange] = useState(false);
    const extra_heading = document.getElementById("hide");

    function a() {
        return (<>
            <tbody>


                <tr>
                    <td> Country </td>
                    <td> Country Code </td>
                    <td> Slug </td>
                    <td> Total Confirmed </td>
                    <td> Total Deaths </td>
                    <td> Total Recovered </td>
                </tr>


                <tr>
                    <td> {local.Country} </td>
                    <td> {local.CountryCode} </td>
                    <td> {local.Slug} </td>
                    <td> {local.TotalConfirmed} </td>
                    <td> {local.TotalDeaths} </td>
                    <td> {local.TotalRecovered} </td>
                </tr>

            </tbody>
        </>
        )
    }

    const submitSearch = (default_send) => {
        default_send.preventDefault();
        if (covid !== undefined) {
            var check = 0;
            if (search !== "") {
                covid.map(data => {
                    if (data.Country.toLowerCase() === search.toLowerCase()) {
                        check = 5;
                        extra_heading.style.display = "block";
                        document.querySelector("#ali").style.color = "white";
                        lchange(data);
                    }
                })

                if (check === 0) { alert("no result found"); lchange(false) }

            }
            else {
                extra_heading.style.display = "none";
                document.querySelector("#ali").style.color = "black";
            }
        }

        searchChange("");
    }

    async function apidata() {
        const data = await fetch("https://api.covid19api.com/summary")
        let actual_api = await data.json();
        change(actual_api.Countries);
    }
    useEffect(() => { apidata() }, []);
    const searching = (change) => { searchChange(change.target.value) }

    return (<>
        <div id="Maindev">
            <div id='hide'>
                <i onClick={() => {
                    extra_heading.style.display = "none";
                    document.querySelector("#ali").style.color = "black";
                }} className="fa fa-window-close"></i>
                <table id='table'>


                    {(local !== false) ? a() : null}



                </table>
            </div>
            <div id="head">
                <h1 id='ali'>Ali Hassan</h1>
                <form onSubmit={submitSearch}>
                    <input value={search} type='search' placeholder="Type Country" id="search" onChange={searching} />
                </form>
            </div>
            <table cellSpacing="0">
                <thead>
                    <tr>
                        <th> Country </th>
                        <th> Country Code </th>
                        <th> Slug </th>
                        <th> Total Confirmed </th>
                        <th> Total Deaths </th>
                        <th> Total Recovered </th>
                    </tr>
                </thead>
                <tbody>

                    {
                        (covid !== undefined) ? covid.map((data, index) => {
                            return (
                                <tr key={index}>
                                    <td>{data.Country}</td>
                                    <td> {data.CountryCode} </td>
                                    <td> {data.Slug} </td>
                                    <td> {data.TotalConfirmed} </td>
                                    <td> {data.TotalDeaths} </td>
                                    <td> {data.TotalRecovered} </td>
                                </tr>

                            )
                        }) : null
                    }
                </tbody>
            </table>
        </div>

    </>
    )

}
export default App;