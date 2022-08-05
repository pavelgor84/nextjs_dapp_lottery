import { useMoralis } from "react-moralis"
import { useEffect } from "react"


export default function ManualHeader() {

    const { enableWeb3, account, isWeb3Enabled, Moralis, deactivateWeb3, isWeb3EnableLoading } = useMoralis()

    useEffect(() => {
        console.log(`Web3 enabled is: ${isWeb3Enabled}, account is ${account}`)
        if (isWeb3Enabled) return
        if (typeof window !== undefined) {
            if (window.localStorage.getItem("connected")) {
                console.log("db item found")
                enableWeb3()
            }
        }

    }, [])

    useEffect(() => {
        Moralis.onAccountChanged((account) => {
            console.log(`Account changed to ${account}`)
            if (account == null) {
                window.localStorage.removeItem("connected")
                deactivateWeb3()
            }
        })
    }, [])


    return (<div>
        {account ?
            (<>Connected to {account.slice(0, 4)}...{account.slice(account.length - 4, account.length)}</>) :
            (<button disabled={isWeb3EnableLoading} onClick={async () => {
                await enableWeb3()
                window.localStorage.setItem("connected", "true")

            }
            }>Connect</button>)}



    </div>)
}