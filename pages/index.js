import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {useForm} from "react-hook-form";
import {useState} from "react";

export default function Home() {

  const { register, handleSubmit, formState: { errors }, resetField } = useForm();

  const [code,setCode] = useState(null)
  const [key,setKey] = useState(null)

  const magicResetNumber = 43210;
  const magicDeactivateNumber = 54321;
  const magicNumber = 32014;
  // const magicResetDec = 1473;

  const onSubmit = data => {
    setCode((magicDeactivateNumber - Number(data.code)) || magicNumber)
    setKey((magicResetNumber - Number(data.code)) || magicNumber)
  }

  const handleReset = () => {
    resetField("code")
    setCode(null)
    setKey(null)
  }

  const handleValidate = (value) => {
    if (value?.length !== 5) {
      return 'Must be five digits'
    }
    if (isNaN(Number(value)) || Number(value) >= magicResetNumber) {
      return 'Invalid argument'
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <img src="/logo.png" alt="Agrosea Logo" />
        {/*<Image src="/logo.png" alt="Agrosea Logo" width={380} height={120} />*/}
        <div className={styles.grid}>
          {(!code || !key) &&
          <>
            <p className={styles.description}>
              Enter trial key
            </p>

            <form onSubmit={handleSubmit(onSubmit)}>
              <input className={styles.input} placeholder="X X X X X" {...register("code", { required: 'The field is required', validate: handleValidate})} />
              {!!errors.code && <span className={styles.error}>{errors.code.message}</span>}

              <input className={styles.button} type="submit" />
            </form>
          </>
          }

          {!!code &&
          <div className={styles.wrapper}>
            <p className={styles.text}>
              Key deactivation trial
            </p>
            <p className={styles.text}>
              {code}
            </p>
          </div>
          }

          {!!key &&
          <div className={styles.wrapper}>
            <p className={styles.text}>
              Key prolongation trial
            </p>
            <p className={styles.text}>
              {key}
            </p>
            <button className={styles.button} onClick={handleReset}>
              Reset
            </button>
          </div>
          }

        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://agrosea.com.ua/en"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            AgroSea
          </span>
        </a>
      </footer>
    </div>
  )
}
