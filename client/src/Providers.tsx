import { ReactNode } from "react";
import { SWRConfig } from "swr";

import fetcher from "./services/fetcher"

export default function Providers({children}:{children:ReactNode}){

    return (
        <SWRConfig value={{
             revalidateOnFocus: false, 
            // revalidateOnMount: false, 
             revalidateOnReconnect: false,

            }}
        >
            {children}
        </SWRConfig>
    )
}