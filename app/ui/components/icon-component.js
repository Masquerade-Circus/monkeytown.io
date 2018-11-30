
export default v(function (props) {
    return <svg class={`icon ${props.size || ''}`} data-color={props.color}>
        <use href={`#${props.icon}`} />
    </svg>;
});
