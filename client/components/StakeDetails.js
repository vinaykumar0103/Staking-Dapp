import React, { useEffect, useState } from 'react';
import { useMoralis, useWeb3Contract } from 'react-moralis';
import { Button } from 'web3uikit';
import StakingAbi from '../constants/Staking.json';
import TokenAbi from '../constants/RewardToken.json';



function StakeDetails() {
  const { account, isWeb3Enabled } = useMoralis();
  const [rtBalance, setRtBalance] = useState('0');
  const [stakedBalance, setStakedBalance] = useState('0');
  const [earnedBalance, setEarnedBalance] = useState('0');
  const [withdrawBalance, setWithdrawBalance] = useState('0');
  const [claimReward, setClaimReward] = useState( '0' )
  


  const stakingAddress = "0x75a04e599d9da859eD02aA87Fa9b958994F0A143"; //replace this with the address where you have deployed your staking Smart Contract
  const rewardTokenAddress = "0xAd5533CFb761422E81d4F57C0fEFA31bBBcaCEDf"; //replace this with the address where you have deployed your Reward Token Smart Contract

  const { runContractFunction: getRTBalance } = useWeb3Contract({
    abi: TokenAbi.abi,
    contractAddress: rewardTokenAddress,
    functionName: 'balanceOf',
    params: {
      account
    }
  });

  const { runContractFunction: getStakedBalance } = useWeb3Contract({
    abi: StakingAbi.abi,
    contractAddress: stakingAddress,
    functionName: 'getStaked',
    params: {
      account
    }
  });

  const { runContractFunction: getEarnedBalance } = useWeb3Contract({
    abi: StakingAbi.abi,
    contractAddress: stakingAddress,
    functionName: 'earned',
    params: {
      account
    }
  });

  const { runContractFunction: getWithdrawBalance } = useWeb3Contract({
    abi: StakingAbi.abi,
    contractAddress: stakingAddress,
    functionName: 's_stakingToken',
    params: {
      account
    }
    
  });

  
  const { runContractFunction: getClaimReward } = useWeb3Contract({
    abi: StakingAbi.abi,
    contractAddress: stakingAddress,
    functionName: 'claimReward',
    params: {
      account
    }
    
  });


 
  
  

  useEffect(() => {
    async function updateUiValues() {

      const rtBalance = (await getRTBalance({ onError: (error) => console.log(error) })).toString();
      const formattedRtBalance = parseFloat(rtBalance) / 1e18;
      const formattedRtBalaceRounded = formattedRtBalance.toFixed(2);
      setRtBalance(formattedRtBalaceRounded);

      const stakedBalace = (await getStakedBalance({ onError: (error) => console.log(error) })).toString();
      const formattedStakedBalance = parseFloat(stakedBalace) / 1e18;
      const formattedStakedBalanceRounded = formattedStakedBalance.toFixed(2);
      setStakedBalance(formattedStakedBalanceRounded);

      const earnedBalance = (await getEarnedBalance({ onError: (error) => console.log(error) })).toString();
      const formattedEarnedBalance = parseFloat(earnedBalance) / 1e18;
      const formattedEarnedBalanceRounded = formattedEarnedBalance.toFixed(2);
      setEarnedBalance(formattedEarnedBalanceRounded);

      

      const withdrawBalance = (await getWithdrawBalance({ onError: (error) => console.log(error) })).toString();
      const formattedWithdrawBalance = parseFloat(withdrawBalance) /1e18;
      const formattedWithdrawBalanceRounded = formattedWithdrawBalance.toFixed(2);
      setWithdrawBalance(formattedWithdrawBalanceRounded);

      const claimReward = (await getClaimReward({ onError: (error) => console.log(error) })).toString();
      const formattedClaimReward = parseFloat(claimReward) / 1e18;
      const formattedClaimRewardRounded = formattedClaimReward.toFixed(2);
      setClaimReward(formattedClaimRewardRounded);
 


     }
  
    

    if (isWeb3Enabled) updateUiValues();
  
}, [account, getEarnedBalance, getRTBalance, getStakedBalance, getWithdrawBalance, getClaimReward,   isWeb3Enabled]);





return (

  
    <div className='p-0 m-0'>
      <div className='font-bold m-2 p-0'>RT Balance is: {rtBalance}</div>
      <div className='font-bold m-2'>Earned Balance is: {earnedBalance}</div>
      <div className='font-bold m-2'>Staked Balance is: {stakedBalance}</div>
      <div className='font-bold m-2'>Claim Blance is: {claimReward}</div>
       {/* <div className='font-bold m-2'>withdraw Balance is:{withdrawBalance}</div> */}
     
      </div>
        
        

   
  );


}
export default StakeDetails;
