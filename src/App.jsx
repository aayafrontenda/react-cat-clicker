import { useState, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import '../css/main.css'
import '../css/tail-main.css'

function App() {
  const [clicks, setClicks] = useState(0);
  const [clickBuff, setClickBuff] = useState(0);
  const [clicksBuffPerSecond, setClicksBuffPerSecond] = useState(0);
  const [shopIsClosed, setShopIsClosed] = useState(true);
  
  // const clicksBuffPerSecond = useRef(0);
  const purchaseClickBuff = (buffCost, buffPower) => {
    if (clicks >= buffCost) {
      setClickBuff(clickBuff + 2 * Math.pow(5, buffPower));
      setClicks(clicks - buffCost);
    }
  }

  const purchaseClicksPerSecondBuff = (buffCost, buffPower) => {
    if (clicks >= buffCost) {
      setClicksBuffPerSecond(clicksBuffPerSecond + 2 * Math.pow(5, buffPower));
      setClicks(clicks - buffCost);
    }
  }

  const catClick = () => {
    const catPic = document.getElementById("cat-pic");
    catPic.classList.remove('heartbeat');
    void catPic.offsetWidth;      
    catPic.classList.add('heartbeat');
    setClicks(clicks + 1 + clickBuff);
    // const clicks = document.getElementById("clicks");
    // clicks.innerText = 'Clicks: ' + clickCount;
  }

  function createMeowOnClicker(event) {
    let clicker = document.getElementById('clicker');
    let clickerOffset = clicker.getBoundingClientRect();
    let position = {
        x: event.pageX - clickerOffset.left,
        y: event.pageY - clickerOffset.top
    }
    let element = document.createElement('div');
    element.innerHTML = '<svg width="10px" height="10px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" id="Filled_Line" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M16,8.064c-2.974-2.753-7.796-2.753-10.77,0s-2.974,7.215,0,9.968L16,28l10.77-9.968  c2.974-2.753,2.974-7.215,0-9.968S18.974,5.312,16,8.064z" fill="#B83B5E" id="XMLID_1338_"/><path d="M7.23,17.032c-2.974-2.753-2.974-7.215,0-9.968c0.257-0.237,0.531-0.447,0.813-0.643  C7.017,6.761,6.052,7.304,5.23,8.064c-2.974,2.753-2.974,7.215,0,9.968L16,28l1.54-1.426L7.23,17.032z" fill="#8A2C47" id="XMLID_1344_"/><path d="M26.77,8.064c-2.974-2.753-7.796-2.753-10.77,0c-2.974-2.753-7.796-2.753-10.77,0  c-0.91,0.843-1.539,1.846-1.892,2.911C6.342,8.317,12.06,8.343,15,11.064c2.974-2.753,6.796-2.753,9.77,0  c2.069,1.915,2.694,4.656,1.885,7.074l0.115-0.106C29.743,15.28,29.743,10.817,26.77,8.064z" fill="#C6627E" id="XMLID_1342_"/><path d="  M16,8.064c-2.974-2.753-7.796-2.753-10.77,0s-2.974,7.215,0,9.968L16,28l10.77-9.968c2.974-2.753,2.974-7.215,0-9.968  S18.974,5.312,16,8.064z" fill="none" id="XMLID_818_" stroke="#200F60" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/><path d="  M22,10.044c0.784,0.113,1.497,0.443,2.052,0.956C24.663,11.565,25,12.293,25,13.048" fill="none" id="XMLID_1340_" stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/></svg>';
    element.className = 'meow unselectable';
    element.style = 'color: black; font-size: 15px; z-index: 99; position: absolute;';
    element.style.left = (position.x - 10)+ 'px';
    element.style.top = (position.y - 10) + 'px';
    clicker.appendChild(element);
    console.log(element);

    let movementInteval = window.setInterval(function() {
        if (typeof element == 'undefined' && element == null)
            clearInterval('movementInterval');
        position.y--;
        element.style.top = position.y + 'px';
    }, 10);

    fadeOut(element, 3000, 0.5, function() {

    });
  }

  function fadeOut(element, duration ,finalOpacity, callback) {
    let opacity = 1;
    let elementFadingInterval = window.setInterval(function() {
        opacity -= 100 / duration;

        if (opacity <= finalOpacity) {
            clearInterval(elementFadingInterval);
            callback();
        }

        element.style.opacity = opacity;
    }, 25);
  }
  useEffect(() => {
    const interval = setInterval(() =>  {
      if (clicksBuffPerSecond != 0) {
          setClicks((prevClicks) => (prevClicks + 1));
      }
      console.log(clicksBuffPerSecond);
    }, 1000 / clicksBuffPerSecond);
    return () => clearInterval(interval);
  }, [clicks, clicksBuffPerSecond]);
 /*
  setInterval(() =>  {
    if (clicksBuffPerSecond != 0) {
        setClicks((prevClicks) => (prevClicks + clicksBuffPerSecond));
    }
    console.log(clicksBuffPerSecond);
  }, 1000);
  */
  function createNumberOnClicker(event) {
    let clicker = document.getElementById('clicker');
    let clickerOffset = clicker.getBoundingClientRect();
    let position = {
        x: event.pageX - clickerOffset.left,
        y: event.pageY - clickerOffset.top
    }
    let element = document.createElement('div');
    element.textContent = '+' + (1 + clickBuff);
    element.className = 'number unselectable';
    element.style = 'color: black; font-size: 15px; z-index: 99; position: absolute;';
    element.style.left = (position.x + 5)+ 'px';
    element.style.top = (position.y + 5) + 'px';
    clicker.appendChild(element);

    let movementInteval = window.setInterval(function() {
        if (typeof element == 'undefined' && element == null)
            clearInterval('movementInterval');
        position.y--;
        element.style.top = position.y + 'px';
    }, 10);

    fadeOut(element, 3000, 0.5, function() {
      // 
    });
  }

  const userClick = (event) => {
    catClick();
    createNumberOnClicker(event);
    createMeowOnClicker(event);
  }

  function loadGame() {
      var savedGame = JSON.parse(localStorage.getItem('gameSave'));
      if (typeof saveGame.score !== undefined) {
          setClicks(savedGame.score);
      }

      if (clickBuffPerSecond !== undefined)
          setClicksBuffPerSecond(savedGame.clickBuffPerSecond);

      if (clickBuff !== undefined) 
          setClickBuff(savedGame.clickBuff);
  }

  function restartGame() {
      setClicks(0);
      setClickBuff(0);
      setClicksBuffPerSecond(0);
  }

  function saveGame() {
      var gameSave = {
          score: clicks,
          clickBuff: clickBuff,
          clickBuffPerSecond: clicksBuffPerSecond
      };
      localStorage.setItem('gameSave', JSON.stringify(gameSave));
  }

  const manipulateShop = () => {
    if (shopIsClosed)
      setShopIsClosed(false);
    else
      setShopIsClosed(true);
  }


  return (
    <div className="App" style={{display: 'flex', height: '121vh'}}>
      <div style={{margin: 'auto'}}>
            <div id="clicker">
                <img src="/cat.svg" id="cat-pic" className="unselectable undraggable" onClick={() => userClick(event)}/>
            </div>
            <p style={{textAlign: 'left', marginLeft: '10px'}} id="clicks">Clicks: {clicks}</p>
            <button className='button-5' style={{marginLeft: "-79px", outline: 'none'}} onClick={() => saveGame()}>
                <svg width="30px" height="30px" viewBox="0 0 1024 1024" className="icon"  version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M915.750748 183.778201L832.043003 100.591614a25.112835 25.112835 0 0 0-17.613899-7.241941h-681.201146c-13.832691 0-25.05345 11.223831-25.05345 25.05345v784.418001c0 13.829619 11.220759 25.05345 25.05345 25.05345h764.905819c13.832691 0 25.05345-11.223831 25.05345-25.05345V201.523157a24.931608 24.931608 0 0 0-7.436479-17.744956z" fill="#27323A" /><path d="M371.493241 143.456573H733.135681v241.920553c0 3.851857-3.19657 6.918393-7.241941 6.918393H378.736206c-3.978818 0-7.241941-3.133089-7.241941-6.918393V143.456573z" fill="#FFFFFF" /><path d="M873.080327 877.767674H158.280385V143.456573h179.808597v241.920553c0 22.24698 18.269186 40.322652 40.6462 40.322652h347.157534c22.378038 0 40.6462-18.074648 40.6462-40.322652V143.456573h37.51311c11.027245 10.963764 57.869999 57.478874 69.027277 68.506119l0.001024 665.804982z" fill="#79CCBF" /><path d="M270.105044 472.344921c-32.749996 0-59.369991 23.813525-59.36999 53.173437v256.732078c0 29.358888 26.619995 53.236917 59.36999 53.236917h490.824004c32.883101 0 59.69661-23.877006 59.69661-53.236917V525.518358c0-29.358888-26.813509-53.173437-59.69661-53.173437H270.105044z" fill="#27323A" /><path d="M244.139312 782.250436V525.518358c0-10.699602 11.875022-19.769178 25.964708-19.769178h490.824004c7.439551 0 14.550434 2.415345 19.571568 6.720783 2.481898 2.087702 6.720783 6.654231 6.720783 13.047371v256.732078c0 10.766154-12.06956 19.832659-26.292351 19.832659H270.105044c-14.089686 0.001024-25.965732-9.064457-25.965732-19.831635z" fill="#F4CE73" /><path d="M572.701041 173.730814c-9.196538 0-16.701617 7.435455-16.701617 16.702641V348.646264c0 9.19961 7.506103 16.702641 16.701617 16.702641H678.265666c9.263091 0 16.702641-7.503032 16.702642-16.702641V190.432432c0-9.266162-7.439551-16.702641-16.702642-16.702642H572.701041z" fill="#27323A" /><path d="M661.564049 207.135073v124.808549h-72.160366V207.135073h72.160366z" fill="#FFFFFF" /><path d="M649.167869 723.923785H382.129362c-12.39618 0-22.44459-10.048411-22.444591-22.378038 0-12.39618 10.048411-22.381109 22.444591-22.381109H649.166845c12.39618 0 22.44459 9.98493 22.444591 22.381109 0 12.329627-10.047387 22.378038-22.443567 22.378038zM649.167869 626.709968H382.129362c-12.39618 0-22.44459-10.044315-22.444591-22.378037 0-12.459661 10.048411-22.44459 22.444591-22.44459H649.166845c12.39618 0 22.44459 9.98493 22.444591 22.44459 0 12.333723-10.047387 22.378038-22.443567 22.378037z" fill="#27323A" /></svg>
            </button>
            <button className="button-5" style={{outline: 'none'}} onClick={() => loadGame()}>
                <svg width="30px" height="30px" viewBox="0 0 1024 1024" className="icon"  version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M851.770202 330.529637h-58.858048V318.759051c0-42.146192-34.274561-76.48321-76.48321-76.48321H515.335818c-19.509111 0-60.776809-63.280209-128.282592-63.280209H172.368023c-42.142096 0-76.480138 34.274561-76.480138 76.48321v511.897612c0 41.300462 32.972179 74.858304 73.879469 76.286624 0.585662 0 0.975763 0.263139 1.561425 0.263138h680.441423c42.205577 0 76.546691-34.341114 76.546691-76.549762V407.012847c0-42.145168-34.341114-76.48321-76.546691-76.48321z" fill="#27323A" /><path d="M188.433807 461.316653v306.775497c0 13.463068-5.26789 24.778025-21.723775 24.91113-14.371254-0.133105-20.874974-11.058985-20.874974-25.626826V255.477818c0-14.634393 11.900619-26.536036 26.531941-26.536035H387.052202c26.079383 0 48.385749 18.210824 68.091446 34.208008 18.340858 14.961012 35.609708 29.073224 60.190123 29.073224h201.093125c14.634393 0 26.536036 11.900619 26.536036 26.536036v11.770586h-176.896667c-40.061561 0-74.272641 54.302782-89.133313 54.302782H264.980498c-42.142096 0.001024-76.546691 34.274561-76.546691 76.484234z" fill="#79CCBF" /><path d="M557.025357 650.052506h-98.107668l182.363192-240.275169 182.229062 240.275169h-99.342474v142.557602H557.025357z" fill="#FFFFFF" /><path d="M238.382005 770.629338V461.316653c0-14.631321 11.9641-26.536036 26.599517-26.536036h211.95143c25.203961 0 42.112403-15.607084 58.435183-30.761611 7.805078-7.219415 24.064377-22.242885 31.217239-23.542195h58.858048c-4.618747 2.470635-8.650807 5.917033-11.708128 10.469227l0.912281-1.23583-182.198345 240.246501c-7.675044 9.429984-9.237493 22.763019-3.773018 34.208009 5.594509 11.641576 17.428576 19.186587 30.241477 19.186587h64.742317v110.627737h-289.247604c1.432416-7.676068 3.969603-14.438831 3.969603-23.349704zM878.368695 767.376454c0 14.697874-11.900619 26.602589-26.598493 26.602588h-94.304958V683.351305h66.077463c12.487305 0 23.412162-6.50372 29.136705-17.365095a34.806982 34.806982 0 0 0 3.903051-16.000256c0-6.762763-1.951525-13.463068-5.853553-19.120035l-183.01131-241.217144c-3.642984-4.098613-7.545011-6.959349-11.641577-9.169917h195.695203c14.697874 0 26.598493 11.900619 26.598493 26.536036v360.36156z" fill="#F4CE73" /></svg>
            </button>
            <button className="button-5" style={{outline: 'none'}} onClick={() => restartGame()}>
                <svg width="30px" height="30px" viewBox="0 0 1024 1024" className="icon"  version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M514.845377 256.867231l-0.441294-0.135153-4.61158 0.065529c-3.393156-0.541635-6.038876-3.525237-6.038875-7.053546V137.082887L309.089478 331.74806l194.66415 194.733774V414.16059a7.180508 7.180508 0 0 1 5.86891-7.056618l5.664134-0.135153c94.043867 1.017742 170.247556 77.867503 170.247556 172.149936 0 94.957173-77.186619 172.146864-172.146863 172.146863-61.114691 0-116.324636-31.946246-147.594094-85.531284-11.328267-19.465084-18.721743-40.017534-21.87531-61.249844l-2.577119-17.08967-146.951094 21.566096 2.715344 17.298543c3.354248 21.298863 9.154559 42.798407 17.294447 64.027645l-0.065528 0.135153 3.288719 8.004735c49.821236 120.801062 165.434271 198.803718 294.542116 198.803718 176.556738 0 320.150511-143.589678 320.150511-320.147439 0-175.674148-142.169549-318.726287-317.46998-320.21604z" fill="#79CCBF" /><path d="M502.975475 137.625546L308.30723 332.289696l194.668245 194.736845v-98.418929l-96.454093-96.317916 96.454093-96.790952z" fill="#F4CE73" /><path d="M502.975475 403.780441l-71.525557-71.490745 71.525557-71.762075v-48.903835c-46.42808 46.462892-102.284096 102.288192-120.66591 120.66591 18.381813 18.381813 74.237829 74.207113 120.66591 120.668981v-49.178236z" fill="#FFFFFF" /><path d="M535.43264 226.410738l-0.069625-106.490217a24.468811 24.468811 0 0 0-15.12381-22.653463 24.435023 24.435023 0 0 0-26.656854 5.289392L281.685187 314.383989c-9.564113 9.564113-9.564113 25.097477 0 34.66159l211.89614 211.893068a24.335706 24.335706 0 0 0 26.656854 5.359016c9.154559-3.795543 15.12381-12.752492 15.12381-22.653463V440.814373c67.014318 10.651479 118.564897 68.37199 118.564897 138.304382 0 77.526549-63.079527 140.537476-140.540547 140.537476s-140.470923-63.010927-140.470924-140.537476c0-7.12317-3.121826-13.838834-8.54637-18.516966-5.359016-4.681204-12.481162-6.716688-19.534708-5.698946l-162.585823 23.809429c-12.752492 1.896236-21.840498 13.294127-20.822756 26.181772 14.245317 181.641352 168.281696 323.946054 350.739086 323.946054 193.920809 0 351.756827-157.769466 351.756827-351.756827-0.001024-186.190475-145.42448-338.597853-328.489033-350.672533z m-23.267794 653.455901c-124.802406 0-232.990225-77.731326-278.500904-188.08671l0.236517-0.33993h-0.336858c-8.852513-21.500568-15.568176-44.153007-19.298191-67.892812 29.098821-4.274721 82.955189-12.141232 112.459469-16.481482 3.663462 24.347993 12.176044 47.004527 24.076663 67.420801h-0.066552l0.101364 0.065528c32.727471 56.096629 93.026125 94.078679 162.551011 94.078679 104.524357 0 189.510935-84.989649 189.510934-189.510934 0-104.454733-84.986578-189.514006-189.510934-189.514007-0.406482 0-0.812965 0.204777-1.222519 0.204777-0.472011 0-0.812965-0.204777-1.288048-0.204777-13.495832 0-24.486218 10.988337-24.486218 24.555842v70.33785c-48.359128-48.431824-129.820468-129.82354-152.747308-152.751404 22.927864-22.923769 104.389204-104.385109 152.747308-152.747308v70.744333c0 13.564433 10.991409 24.486218 24.555842 24.486217 0.201705 0 0.406482-0.135153 0.61126-0.135153 0.201705 0 0.406482 0.135153 0.607164 0.135153 166.927096 0 302.78644 135.859344 302.786439 302.852993 0 166.923001-135.859344 302.782344-302.786439 302.782344z" fill="#27323A" /></svg>
            </button>
            <button className="button-5" style={{marginLeft: '40px', outline: 'none'}} onClick={() => manipulateShop()}>
                <img src='shop.svg' width="30px" height="30px"  />
            </button>
      </div>
      { shopIsClosed ? (
        <></>
      ) : (
      <div className="w-1/4 bg-yellow-300 border-l-4 border-brown-600 p-4" style={{marginRight: '-28px'}}>
            <h1 className="text-center mb-4 font-bold text-xl">Shop</h1>
            <button type="button" onClick={() => purchaseClickBuff(100, 0)} className="button-5 small-box" style={{outline: 'none', width: '50vh', height: '12vh', marginBottom: '2vh', paddingRight: '1vh', paddingLeft: '2.7vh', backgroundColor: '#ffe5b4', outline: 'none'}}>
                <img src="box.svg" style={{height: '5vh', width: '5vh', marginRight: '0', marginLeft: '0'}}/> 
                <div style={{width: '68%', float: 'left', marginRight: '6vh'}}>
                    <p>Small Box <br /> (+2 clicks)</p>
                </div>
                <p className="cost" style={{width: '51%', float: 'right'}}>100 clicks</p>
            </button>
            <button type="button" onClick={() => purchaseClicksPerSecondBuff(500, 0)} className="button-5 small-mouse" style={{outline: 'none', width: '50vh', height: '12vh', marginBottom: '2vh', paddingRight: '1vh', paddingLeft: '2.7vh', backgroundColor: '#ffe5b4'}}>
                <img src="mouse.svg" style={{height: '5vh', width: '5vh', marginRight: '0', marginLeft: '0'}}/> 
                <div style={{width: '68%', float: 'left', marginRight: '6vh'}}>
                    <p>Small Mouse <br /> (+2 clicks per second)</p>
                </div>
                <p className="cost" style={{width: '51%', float: 'right'}}>500 clicks</p>
            </button>
            <button type="button" onClick={() => purchaseClickBuff(5000, 1)} className="button-5 small-mouse" style={{outline: 'none', width: '50vh', height: '12vh', marginBottom: '2vh', paddingRight: '1vh', paddingLeft: '2.7vh', backgroundColor: '#ffe5b4'}}>
                <img src="box.svg" style={{height: '5vh', width: '5vh', marginRight: '0', marginLeft: '0'}}/> 
                <div style={{width: '68%', float: 'left', marginRight: '6vh'}}>
                    <p>Medium Box <br /> (+10 clicks)</p>
                </div>
                <p className="cost" style={{width: '51%', float: 'right'}}>5000 clicks</p>
            </button>
            <button type="button" onClick={() => purchaseClicksPerSecondBuff(10000, 1)} className="button-5 small-mouse" style={{outline: 'none', width: '50vh', height: '12vh', marginBottom: '2vh', paddingRight: '1vh', paddingLeft: '2.7vh', backgroundColor: '#ffe5b4'}}>
                <img src="mouse.svg" style={{height: '5vh', width: '5vh', marginRight: '0', marginLeft: '0'}}/> 
                <div style={{width: '68%', float: 'left', marginRight: '6vh'}}>
                    <p>Medium Mouse <br /> (+10 clicks per second)</p>
                </div>
                <p className="cost" style={{width: '51%', float: 'right'}}>10000 clicks</p>
            </button>
            <button type="button" onClick={() => purchaseClickBuff(20000, 2)} className="button-5 small-mouse" style={{outline: 'none', width: '50vh', height: '12vh', marginBottom: '2vh', paddingRight: '1vh', paddingLeft: '2.7vh', backgroundColor: '#ffe5b4'}}>
                <img src="box.svg" style={{height: '5vh', width: '5vh', marginRight: '0', marginLeft: '0'}}/> 
                <div style={{width: '50%', float: 'left', marginRight: '6vh'}}>
                    <p>Big Box <br /> (+50 clicks per second)</p>
                </div>
                <p className="cost" style={{width: '52%', float: 'right', marginRight: '-10px'}}>20000 clicks</p>
            </button>
            <button type="button" onClick={() => purchaseClicksPerSecondBuff(50000, 2)} className="button-5 small-mouse" style={{outline: 'none', width: '50vh', height: '12vh', marginBottom: '2vh', paddingRight: '1vh', paddingLeft: '2.7vh', backgroundColor: '#ffe5b4'}}>
                <img src="mouse.svg" style={{height: '5vh', width: '5vh', marginRight: '0', marginLeft: '0'}}/> 
                <div style={{width: '50%', float: 'left', marginRight: '6vh'}}>
                    <p>Big Mouse <br /> (+50 clicks per second)</p>
                </div>
                <p className="cost" style={{width: '52%', float: 'right', marginRight: '-10px'}}>50000 clicks</p>
            </button>
        </div>
        )}
    </div>
  )
}

export default App
