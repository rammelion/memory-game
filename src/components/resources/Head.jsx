export default function Head(props) {
    const type = props.type
    const text = props.text
    const classes = props.classes
    switch (type) {
        case 'h1': return <h1 className={classes}>{text}</h1>
        case 'h2': return <h2 className={classes}>{text}</h2>
        case 'h3': return <h3 className={classes}>{text}</h3>
        case 'h4': return <h4 className={classes}>{text}</h4>
        default: return null
    }
}