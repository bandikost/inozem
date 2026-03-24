'use client'

interface Props {
  price: string
  programId: number
  userId: number
  name: string
  time: string
}

export default function PayButton({ price, programId, userId, name, time }: Props) {

  const handleClick = async () => {
    
    const res = await fetch("/api/yookassa/create-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        item: price,
        programId,
        userId,
        name, 
        time
      }),
    })

    if (res.status === 401) {
    window.location.href = "/login"
    return
  }

    const data = await res.json();
    window.location.assign(data.url);
  }

  return <button className="button-more" onClick={handleClick}>Оплатить</button>
}