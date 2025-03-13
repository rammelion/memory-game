import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fa1, fa2, fa3, fa4, fa5, fa6, fa7, fa8, fa9, fa0 } from "@fortawesome/free-solid-svg-icons";

export default function Numbers({number, size}) {
    const iconName = 'fa' + number;
    return (
        <FontAwesomeIcon icon={iconName} size={size} />
    )

}