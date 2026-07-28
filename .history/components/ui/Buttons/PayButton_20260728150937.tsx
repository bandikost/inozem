type Props = {
  programId:number;
  userId:number;
};


export default function PayButton({
  programId,
  userId
}:Props){

const pay = async()=>{

const res = await fetch("/api/payment",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
programId,
userId
})
});


const data = await res.json();


if(data.Success){
 window.location.href=data.PaymentURL;
}


}


return (
<button onClick={pay}>
Оплатить онлайн
</button>
)

}