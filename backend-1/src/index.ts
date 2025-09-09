import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  //@ts-ignore
  const razorpayKey = c.env.RAZORPAY_KEY_ID;
  //@ts-ignore
  const razorpaySecret = c.env.RAZORPAY_KEY_SECRET;


  //@ts-ignore
  console.log('Key ID:', razorpayKey);
  c.json({ message: razorpayKey })

})

export default app
