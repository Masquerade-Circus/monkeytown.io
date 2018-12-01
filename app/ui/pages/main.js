import {displayName, version, description} from '../../../package.json';
import icons from '../icons.svg';
import Links from './links';

let Main = {
    title: displayName,
    version: version,
    description: description,
    id: (0 | Math.random() * 6.04e7).toString(36), // change this to version when publish
    view(...children) {
        let view = <html lang="en">
            <head>
                <title>{Main.title}</title>
                <meta charset="utf-8"/>
                <meta name="description" content={Main.description}/>
                <meta http-equiv="x-UA-Compatible" content="IE=edge"/>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, minimal-ui"/>
                <link href={`/css/main.css?v=${Main.id}`} rel="stylesheet"/>
                <Links/>
            </head>
            <body>
                <div id="hidden-icons">{v.trust(icons)}</div>
                <div id="ui">
                    {children}
                    <script src={`/js/socket.io.js?v=${Main.id}`}></script>
                    <script src={`/js/three.min.js?v=${Main.id}`}></script>
                    <script src={`/js/CSS2DRenderer.js?v=${Main.id}`}></script>
                    <script src={`/js/index.min.js?v=${Main.id}`}></script>
                </div>
                {v.trust(`
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-130237454-1"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-130237454-1');
</script>
                `)}

            </body>
        </html>;

        return view;
    }
};

export default Main;
