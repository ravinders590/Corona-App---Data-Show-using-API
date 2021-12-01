import React,{useState,useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  const[result_data,setState] = useState('');
  const[result,setOutput] = useState("India");
  
  /*const{= (x) =>{
    console.log(x);
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }*/
  const getCountries = async (res) => {
    /*fetch("https://covid-193.p.rapidapi.com/statistics", {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "covid-193.p.rapidapi.com",
        "x-rapidapi-key": "159d38567emshbb55294f227f01cp1178eajsn009fc4337745"
      }
    })*/
    fetch("https://twilio-sms.p.rapidapi.com/2010-04-01/Account", {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "twilio-sms.p.rapidapi.com",
      "x-rapidapi-key": "159d38567emshbb55294f227f01cp1178eajsn009fc4337745"
    }
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      const country_data = data.response;
      country_data.filter((item) =>{
        const country = item.country;
        const population = item.population;
        const continent = item.continent;
        const {new:newDeath,'1M_pop':popDeathCase,total:totalDeath} = item.deaths;
        const {'1M_pop':testCase,total:totalTest} = item.tests;
        const {new:newCase,active:activeCase,critical:criticalCase,recovered:recoveredCase,'1M_pop':popCase,total:totalCase} = item.cases;
        if(result === country){
          const alldata = {
            country,
            continent,
            population,
            newCase,
            activeCase,
            criticalCase,
            recoveredCase,
            totalCase,
            popCase,
            popDeathCase,
            totalDeath,
            testCase,
            totalTest,
            newDeath
          }
          setState(alldata);
        }
      })
    
    })
    .catch(err => {
      console.error(err);
    });
  }
  const {
        country,
        continent,
        population,
        newCase,
        activeCase,
        criticalCase,
        recoveredCase,
        totalCase,
        popCase,
        popDeathCase,
        totalDeath,
        testCase,
        totalTest,
        newDeath
      } = result_data;

  useEffect(()=>{
    getCountries();
  },[]);

  let newCaseNull = '';
  if(newCase == null){
     newCaseNull = "0";
  }else{
    newCaseNull = newCase;
  }

  let newDeathCaseNull = '';
  if(newDeath == null){
     newDeathCaseNull = "0";
  }else{
    newDeathCaseNull = newDeath;
  }
  return (
    <>

      <div className="covid-wrapper" style={{backgroundImage:`url(images/bg.jpg)`}}>
        <div className="covid-container">
          <div className="row m-0">
            <div className="col-12">
              <div className="corona-data-contain" >
                <div className="search">
                <input type="text" value={result} onChange={(e)=>setOutput(e.target.value)} className="form-control" />
                <button type="button" className="btn btn-primary" onClick={getCountries}>Search</button>
                </div>
                <div className="corona-data-show">
                  <ul>
                    <li>
                      <div className="info">
                      <div className="icon"><i className="fas fa-globe-americas"></i></div>
                      <div className="data-show"> <h3>{continent}<span>{country}</span></h3> </div>
                      </div>
                    </li>
                    <li>
                      <div className="info blue">
                      <div className="icon"><i className="fas fa-users"></i></div>
                      <div className="data-show"> <h3>Population<span>{population}</span></h3> </div>
                      </div>
                    </li>
                    <li>
                      <div className="info pink">
                      <div className="icon"><i className="fas fa-users"></i></div>
                      <div className="data-show"> <h3>Case<span>{newCaseNull}</span></h3> </div>
                      </div>
                    </li>

                  </ul>
                </div>
                <div className="table-responsive">
                  <table className="table table-bordered table-inverse table-hover">
                    <thead>
                      <tr>
                        <th style={{backgroundColor:`#27ae60`,color:`#fff`}}>Active Case</th>
                        <th style={{backgroundColor:`#f1c40f`,color:`#fff`}}>Critical Case</th>
                        <th style={{backgroundColor:`#1abc9c`,color:`#fff`}}>Recovered Case</th>
                        <th style={{backgroundColor:`#6c5ce7`,color:`#fff`}}>Pop Case</th>
                        <th style={{backgroundColor:`#2d3436`,color:`#fff`}}>Total Case</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{backgroundColor:`#27ae60`,color:`#fff`}}>{activeCase}</td>
                        <td style={{backgroundColor:`#f1c40f`,color:`#fff`}}>{criticalCase}</td>
                        <td style={{backgroundColor:`#1abc9c`,color:`#fff`}}>{recoveredCase}</td>
                        <td style={{backgroundColor:`#6c5ce7`,color:`#fff`}}>{popCase}</td>
                        <td style={{backgroundColor:`#2d3436`,color:`#fff`}}>{totalCase}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <h4 className>Death Rate</h4>
                <div className="table-responsive">
                  <table className="table table-bordered table-inverse table-hover">
                    <thead>
                      <tr>
                        <th style={{backgroundColor:`#27ae60`,color:`#fff`}}>New Death Case</th>
                        <th style={{backgroundColor:`#6c5ce7`,color:`#fff`}}>Pop Death Case</th>
                        <th style={{backgroundColor:`#2d3436`,color:`#fff`}}>Total Death Case</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{backgroundColor:`#27ae60`,color:`#fff`}}>{newDeathCaseNull}</td>
                        <td style={{backgroundColor:`#6c5ce7`,color:`#fff`}}>{popDeathCase}</td>
                        <td style={{backgroundColor:`#2d3436`,color:`#fff`}}>{totalDeath}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

export default App;
