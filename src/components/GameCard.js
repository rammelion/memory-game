import { useState } from "react"



export default function GameCard({props}) {

    return (
        <div id={props.id} data-id={props.data} data-solved={props.solved} className={name} key={props.id} onClick={() => props.onClick(props.id)}>
            <p>
                {props.value}
            </p>
        </div>
    )
}