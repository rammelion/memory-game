import horinzontalLogo from '../../assets/img/logos/Rammelion-horizontal.png'
import standAloneLogo from '../../assets/img/logos/Rammelion-logo.png'
export default function Logo(props) {
    if (props.type==='horizontal') {
        return (
                <img src={horinzontalLogo} alt="Rammelion Logo" width={props.width}></img>
        )
    } else if (props.type==='standalone') {
        return (
            <img src={standAloneLogo} alt="Rammelion Logo" width={props.width}></img>
        )
    }
}