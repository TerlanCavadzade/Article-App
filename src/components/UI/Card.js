import './Card.css'

const Card = (props) =>{
    return <section className={props.className? `${props.className} card` : 'card'}>{props.children}</section>
}

export default Card;