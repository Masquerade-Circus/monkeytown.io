
export default v(function (props, ...children) {
    return <section data-panel={props.position} data-background={props.color} data-border={props.border}>
        <nav>{props.title}</nav>
        <div>{children}</div>
    </section>;
});
