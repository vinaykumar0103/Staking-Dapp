import React from 'react';
import { useWeb3Contract } from 'react-moralis';
import StakingAbi from '../constants/Staking.json';
import TokenAbi from '../constants/RewardToken.json';
//import { Button } from 'web3uikit';
import { Form } from 'web3uikit';
import { ethers } from 'ethers';

function StakeForm() {
  const stakingAddress = "0x75a04e599d9da859eD02aA87Fa9b958994F0A143"; //replace this with the address where you have deployed your staking Smart Contract
  const tesTokenAddress = "0xAd5533CFb761422E81d4F57C0fEFA31bBBcaCEDf"; //replace this with the address where you have deployed your Reward Token Smart Contract

  const { runContractFunction } = useWeb3Contract();

  let approveOptions = {
    abi: TokenAbi.abi,
    contractAddress: tesTokenAddress,
    functionName: 'approve'
  };

  let stakeOptions = {
    abi: StakingAbi.abi,
    contractAddress: stakingAddress,
    functionName: 'stake'
  };

  let withdrawOptions = {
    abi: StakingAbi.abi,
    contractAddress: stakingAddress,
    functionName: 'withdraw'
  };

  let claimOptions = {
    abi: stakingAddress.abi,
    contractAddress: stakeOptions,
    functionName: 'claim'
  };
  
  async function handleStakeSubmit(data) {
    const amountToApprove = data.data[0].inputResult;
    approveOptions.params = {
      amount: ethers.utils.parseEther(amountToApprove, 'ether'),
      spender: stakingAddress
    };

    const tx = await runContractFunction({
      params: approveOptions,
      onError: (error) => console.log(error),
      onSuccess: () => {
        handleApproveSuccess(approveOptions.params.amount);
      }
    });
  }

  async function handleApproveSuccess(amountToStakeFormatted) {
    stakeOptions.params = {
      amount: amountToStakeFormatted
    };

    const tx = await runContractFunction({
      params: stakeOptions,
      onError: (error) => console.log(error)
    });

    // if(tx) {
    // await tx.wait(0);
    // console.log('Stake transaction complete');
    // }
  }

 
async function handleWithdrawSubmit(data) {
  const amountToWithdraw = data.data[0].inputResult;
  withdrawOptions.params = {
    amount: ethers.utils.parseEther(amountToWithdraw, 'ether'),
    spender: stakingAddress
  };


  const tx = await runContractFunction({
    params: withdrawOptions,
    onError: (error) => console.log(error),
    onSuccess: () => {
      handleWithdrawSuccess(withdrawOptions.params.amount);
      
      console.log('Withdraw transaction complete');
    }
  });
}

async function handleWithdrawSuccess(amountToWithdrawFormatted) {
  stakeOptions.params = {
    amount: amountToWithdrawFormatted
  };

    const tx = await runContractFunction({
    params: stakeOptions,
    onError: (error) => console.log(error)
  });


  

  // if(tx) {
  //   await tx.wait(0);
  //   console.log('Stake transaction complete');
  //   }
  
 
// async function handleClaimRewardSubmit(data) {
//   const amountToClaim = data.data[0].inputResult;
//   claimOptions.params = {
//     amount: ethers.utils.parseEther(amountToClaim, 'ether'),
//     spender: stakingAddress
//   };

//    const tx = await runContractFunction({
//     params: claimOptions,
//     onError: (error) => console.log(error),
//     onSuccess: () => {
//       handleClaimSuccess(claimOptions.params.amount);
      
//       console.log('claim rewards');
//     }
//   });
// }

// async function handleClaimSuccess(amountToEarnedFormatted) {
//   stakeOptions.params = {
//     amount: amountToEarnedFormatted
//   };

//     const tx = await runContractFunction({
//     params: stakeOptions,
//     onError: (error) => console.log(error)
//   });


// }
   

    
  
  }
  return (
    
    <div className='text-black'>
      <Form
        onSubmit={handleStakeSubmit}
        
        data={[
          {
            inputWidth: '50%',
            name: 'Amount to stake',
            type: 'number',
            value: '',
            key: 'amountToStake'
          }
        ]}
        title="Stake Now!">    
      </Form>

      <br />


      <Form
       onSubmit={handleWithdrawSubmit}
       data={[
        {
          inputWidth: '50%',
          name: 'Amount to withdrew',
          type : 'number',
          value: "",
          key: 'amountToWithdraw'
        }
       ]}
        title='Withdraw Now!'>

      </Form>

      {/* <br />

      <Form
        onSubmit={handleClaimRewardSubmit}
        data={[
          {
            inputWidth: '50',
            type : 'button',
            value: 'claim Reward'
          }
        ]}
        title='claim Reward'>
      </Form>
     */}
</div>
      
  );
}

export default StakeForm;
