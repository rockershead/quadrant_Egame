import { useStoreApi } from "../store/storeApi";
import useWeb3 from "../utils/useWeb3";
import { Button, TextField,Typography,Container,makeStyles,Grid } from "@material-ui/core";

//import ReceiptIcon from '@material-ui/icons/Receipt';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import { useHistory } from 'react-router-dom';

import Layout from '../components/Layout';

const myContract=require('../contracts/egame.json');


const useStyles = makeStyles((theme) =>({
  btn: {
    //fontSize: 60,
    backgroundColor: '#33ffe0',
    '&:hover': {
      background: 'grey'
    },
    color:'green',
    
  },
  paper: {
    marginTop: theme.spacing(30),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }
  //title: {
    //textDecoration: 'underline',
    //marginBottom: 20,
 // }
}))


const Home = () => {
   const classes = useStyles()

    const { balance, address, message, setAddress, setBalance,settokenBalance,tokenBalance } = useStoreApi();
    const web3 = useWeb3();
    const history = useHistory();

    // get user account on button click
  const getUserAccount = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.enable();
        web3.eth.getAccounts().then(accounts => {
          setAddress(accounts[0]);
          updateBalance(accounts[0]);
          updateTokenBalance(accounts[0]);
          
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("Metamask extensions not detected!");
    }
  };

  const updateBalance = async fromAddress => {
    await web3.eth.getBalance(fromAddress).then(value => {
      setBalance(web3.utils.fromWei(value, "ether"));
    });
  };

  const updateTokenBalance = async fromAddress => {
    const tokenInst = new web3.eth.Contract(myContract.abi, myContract.contract_address);
    const token_balance = await tokenInst.methods.balanceOf(fromAddress).call()
    settokenBalance(token_balance)
  };

  //function to make claims
  const claim = async()=>{

    var contract=new web3.eth.Contract(myContract.abi,myContract.contract_address)
    await contract.methods.claim().send({
      from:address
      })

  }
 //function to insert score
  const insertScore = async e=>{
    e.preventDefault();
    const score=e.target[0].value

    var contract=new web3.eth.Contract(myContract.abi,myContract.contract_address)

    await contract.methods.insertScore(score).send({
      from:address
      })

  }


    return (  
      <Layout>
      <div className={classes.paper}>
         
       {address ? (
          <>
            <p> Your account: {address}</p>
            <p> BNB Balance: {balance} </p>
            <p> Egame Balance: {tokenBalance} </p>
          </>
        ) : null}
        <br></br>
        
       <p> <Button
          onClick={() => getUserAccount()}
          variant="contained"
          theme="default"
          endIcon={<AccountBalanceWalletIcon  />}
          className={classes.btn}
        >
          Connect your wallet
        </Button></p>
        &nbsp;
        <p><Button 
          Link
          onClick={() => claim() }
          variant="contained"
          className={classes.btn}
          
        >
          Claim Your Tokens
        </Button>
        
        </p>
        &nbsp;&nbsp;
        <form autoComplete="off" onSubmit={e => insertScore(e)}>
        
        <TextField 
            className={classes.field}
            required
            label="Input Your Score"
            inputProps={{ step: "any" }}
            type="text"
            variant="outlined"
            style = {{width: 500}}
            fullWidth
            //error
          />
          &nbsp;&nbsp;
          <Button
            className={classes.btn}
            style={{ margin: "10px" }}
            type="submit"
            variant="outlined"
            
          >
            Submit Your Score
          </Button>


        
        </form>
        
        </div>
        </Layout>


    );
}
 
export default Home;