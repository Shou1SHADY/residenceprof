import dns from 'dns';

const hostname = 'cluster0.9r3tc5s.mongodb.net';

console.log(`Resolving hostname: ${hostname}`);

dns.resolveSrv(`_mongodb._tcp.${hostname}`, (err, addresses) => {
  if (err) {
    console.error('SRV record lookup failed:', {
      code: err.code,
      message: err.message,
      syscall: err.syscall,
      hostname: err.hostname
    });
    
    console.log('\nTroubleshooting steps:');
    console.log('1. Check your internet connection');
    console.log('2. Try using Google DNS (8.8.8.8) or Cloudflare DNS (1.1.1.1)');
    console.log('3. Try using a different network (e.g., mobile hotspot)');
    console.log('4. Check if your firewall is blocking the connection');
    console.log('5. Try using a VPN to rule out network restrictions');
    
    // Try direct IP connection as fallback
    console.log('\nTrying direct IP resolution...');
    dns.resolve4(hostname, (err, addresses) => {
      if (err) {
        console.error('Direct IP resolution failed:', err);
      } else {
        console.log('Direct IP addresses:', addresses);
      }
    });
    
    return;
  }
  
  console.log('SRV records:', JSON.stringify(addresses, null, 2));
});
