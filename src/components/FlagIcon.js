import HU from '../img/icons/hu_round_64.png'
import US from '../img/icons/us_round_64.png'

export default function FlagIcon(props) {
    switch(props.country) {
        case 'HU':
            return (<img src={HU} alt ="hungarian flag" />)
            break;

        case 'US':
            return (<img src={US} alt ="hungarian flag" />)
            break;
    }
}