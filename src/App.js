import React, {useState} from 'react';
import './App.css';



function App() {
var msg;
const [help, sethelp] = useState(false)
const [email, setEmail] = useState("")
const [time, setTime] = useState("")
const [code, setCode] = useState(0)
const [alert, setError] = useState(false)
const [alertStat, setStatus] = useState("alert alert-danger")
const [alertMsg, setMsg] = useState("")

const emailChange = (e) => {
  setEmail(e.target.value)
}
const timeChange = (e) => {
  setTime(e.target.value)
}
const codeChange = (e) => {
  setCode(e.target.value)
}
const deleteAlert = () => {
  setMsg("");
  setError(false);
}

const flashSuccess = () =>{
  setMsg("Byl jste zaregistrován do systému!")
  setError(true)
  setStatus("alert alert-success")
}
const handleForm = () =>{
  if(email && time&& code){
    const data = {email:email, time:time, code:code}
    const putMethod = {
      method: 'PUT', 
      headers: {
       'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
      },
      body: JSON.stringify(data) ,
      
     }
     fetch("https://chalec-api.herokuapp.com/", putMethod)
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      flashSuccess();
    })
    .catch((error) => {
      console.error('Error:', error);
    });




  }
  else{
  if(! email){
    msg = "email"
  }
  if(!time){
    msg = "čas"
  }
  if(!code){
    msg = "číslo jídelny"
  }
  setMsg("Chybí " + msg + "!");
  setError(true);
  }
}
const handleHelp = () =>{
  if(help){
    sethelp(false);
  }
  else{

    sethelp(true);
  }
  
}
  return (
    <div class="App">
      {alert ?  (

      <div class={alertStat} role="alert" onClick={()=>deleteAlert()}>
      {alertMsg}
   
    </div>
  ):<span></span>}
    
    <div className="box">
      
     
      <div class="header">
        <h1>O<span class="small">bědový</span>U<span class="small">pomínkový</span>S<span class="small">ystém</span></h1>

      </div>
      
      <div class="intro">
        <h4 class="header-low">Základní informace</h4>
        <p classs="plain-text">Obědový upomínková systém je webová aplikace vyvinutá za učelem vytvoření funkčního systému, jež se snaží ušetřit drahý čas uživatelů, kteří by bez tohoto programu trávili na svých mobilních zařízeních své drahocenné minuty při zjišťování té nejdůležitější otázky, otázky tak důležité, že i výbuj jaderného reaktoru v Dukovanech by musel počkat na její zodpovězení. Touto otázkou není však nic jiného než dotaz: "Co je dneska asi k obědu?". <br></br> Na tuto otázku je schopen O.U.S. odpovědět poměrně jednoduše díky kódu napsanému v jazyce python, který každý den kontroluje čas, jež jste zadali/zadáte do políčka níže a pokud se vámi zadaný čas shoduje s aktuálním časem systém posílá emil na předem stanovenou adresu.</p>
      </div>
      <div class="form-holder">
        <h4 class="header-low">Základní informace</h4>
        <p class="help" onClick={()=> handleHelp()}>? Nápověda k vyplnění formuláře ? </p>
        <span class="help-content">
         {help ? (<i>email = vaše emailová adresa, kód = kód jídelny ve ketré se starvujete, čas = čas ve ketrý vám přijde oznámení o jídle</i>):<span></span>}
        </span>
        <form class="form">
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" class="form-control" id="email" placeholder="Zadejte email" value={email} onChange={emailChange}></input>
    
      </div>
      <div class="form-group">
        <label for="code">Číslo jídelny</label>
        <input type="number" class="form-control" id="code" name="code"placeholder="Číslo jídelny" value={code} onChange={codeChange}></input>
      </div>
      <div class="form-group">
        <label for="code">Čas</label>
        <input type="time" class="form-control" id="code" name="time" value={time} onChange={timeChange}></input>
      </div>
      <button type="button" class="btn btn-primary" onClick={handleForm}>Odeslat</button>
      </form>
    </div>
    </div>
    </div>
  );
}

export default App;
 