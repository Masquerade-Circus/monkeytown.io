
export default v(function (props, ...children) {
    return <section data-panel={props.position} data-background={props.color}>
        <nav>{props.title}</nav>
        <div>{children}</div>
    </section>;
});
