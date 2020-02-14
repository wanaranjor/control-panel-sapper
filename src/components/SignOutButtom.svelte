<script>
import { goto } from '@sapper/app';

function signOut() {
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
    console.log("logged out")
    goto('/') ;
  }).catch(function(error) {
    console.log(error);
  });
}
</script>

<button
  class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
  on:click={() => {
      signOut();
    }}>
  Salir
</button>

