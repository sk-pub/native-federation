import { initFederation, loadRemoteModule } from '@softarc/native-federation';

const config = { "remote-app" : "http://localhost:4170/remoteEntry.json" };
await initFederation(config);

await loadRemoteModule({
  remoteName: 'remote-app',
  exposedModule: './main',
});
