import Sortable from 'sortablejs';
import {fetchWithToken} from '../middleware/fetch_with_token';
import {createMap, updateJourneysAbstractAndMaps} from '../components/init_mapbox';

const sortMapinfos = () => {
  const url = `/visits`
  fetch(url, { headers: { accept: "application/json" } })
  .then(response => response.json())
  .then((data) => {
    const mapElts = updateJourneysAbstractAndMaps(data);
      if(mapElts) {
        mapElts.forEach((mapElt)=> {
          createMap(mapElt)
        })
      }
  });
};

export const initSortable = () => {
  const list = document.querySelector('#card-list');
  if (list){
    Sortable.create(list, {
      animation: 150,
      delay: 500,
      delayOnTouchOnly: true,
      onEnd: (event) => {
        const url = `/visits/${event.item.dataset.id}/move?old=${event.oldIndex}&new=${event.newIndex}`;
        fetchWithToken(url, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'PATCH',
          body: JSON.stringify( {} )
        })
        .then(() => sortMapinfos())
      }
    });
  }
}
