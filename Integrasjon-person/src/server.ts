/** source/server.ts */
import http from 'http';
import express, {Express} from 'express';
import morgan from 'morgan';
import routes from './routes/person';

const router: Express = express();

/** Logging: https://www.npmjs.com/package/morgan */
router.use(morgan('dev'));
/** Parse forespørsel */
router.use(express.urlencoded({extended: false}));
/**  Jason parser  for innkommende forespørsler*/
router.use(express.json());

router.use((req, res, next) => {
    // CORS policy
    res.header('Access-Control-Allow-Origin', '*');
    // s CORS headers
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
    // CORS method headers
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
        return res.status(200).json({});
    }
    next();
});

/** Ruter */
router.use('/', routes);

/** feilhåndtering */
router.use((req, res) => {
    const error = new Error('Ressurs ikke funnet!');
    return res.status(404).json({
        message: error.message
    });
});

/** Tjener */
const httpServer = http.createServer(router);
const PORT: any = process.env.PORT ?? 6060;
httpServer.listen(PORT, () => console.log(`Startet på port: ${PORT}`));