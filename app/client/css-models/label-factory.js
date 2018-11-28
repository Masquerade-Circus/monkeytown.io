let Factory = (text = '') => {
    let element = document.createElement('div');
    element.className = 'label';
    element.innerText = text;

    return new THREE.CSS2DObject(element);
};

export default Factory;
