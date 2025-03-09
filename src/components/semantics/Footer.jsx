export default function Footer(props){
    return (
        <footer className="container mx-0 my-0 px-0 py-0 col-12 col-lg-8 mx-lg-auto bg-danger text-warning">
            {props.children}
        </footer>

    );
}