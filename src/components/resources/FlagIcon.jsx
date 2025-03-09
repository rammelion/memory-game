import HU from '../../assets/img/icons/hu_round_64.png'
import US from '../../assets/img/icons/us_round_64.png'

export default function FlagIcon(props) {
    switch(props.country) {
        case 'HU':
            return (<img src={HU} alt ="hungarian flag" />)

        case 'US':
            return (<img src={US} alt ="hungarian flag" />)
    }
}