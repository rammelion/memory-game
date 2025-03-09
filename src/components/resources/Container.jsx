export default function Container(props) {
    return (
        <div id = {props.idName} className = {props.className}>
            {props.children}
        </div>
    )

}