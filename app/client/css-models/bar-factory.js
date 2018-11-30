let Factory = (color) => {
    let element = document.createElement('div');
    element.className = 'bar';
    let child = document.createElement('div');
    child.style.width = '100%';
    child.setAttribute('data-background', color);
    element.appendChild(child);

    return new THREE.CSS2DObject(element);
};

export default Factory;
