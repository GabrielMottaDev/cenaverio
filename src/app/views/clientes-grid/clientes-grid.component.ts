import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/shared/cliente';

@Component({
  selector: 'app-clientes-grid',
  templateUrl: './clientes-grid.component.html',
  styleUrls: ['./clientes-grid.component.scss']
})
export class ClientesGridComponent implements OnInit {

  path = '/assets/empresas/';

  clientes : Cliente[] = [
    {
      image: 'logo_agencia_bpa.png'
    },
    {
      image: 'logo_biocom.png'
    },
    {
      image: 'logo_br.png',
      // customStyle: {
      //   'mix-blend-mode': 'multiply'
      // }
    },
    {
      image: 'logo_cspm.png'
    },
    {
      image: 'logo_gac.png'
    },
    {
      image: 'logo_gem_shippin.png'
    },
    {
      image: 'logo_great_ocean.png'
    },
    {
      image: 'logo_inter_express.png'
    },
    {
      image: 'logo_iss_shipping.png',
      customStyle: {
        'filter': 'drop-shadow(#00000091 0px 0px 2px)'
      }
    },
    {
      image: 'logo_jumbo.png'
    },
    {
      image: 'logo_knot.png'
    },
    {
      image: 'logo_knot_managemen.png'
    },
    {
      image: 'logo_lachmman.png'
    },
    {
      image: 'logo_lbh.png'
    },
    {
      image: 'logo_lma.png'
    },
    {
      image: 'logo_odebrtech.png'
    },
    {
      image: 'logo_orionrodos.png'
    },
    {
      image: 'logo_pennant.png'
    },
    {
      image: 'logo_port_logistic.png'
    },
    {
      image: 'logo_poseidon.png'
    },
    {
      image: 'logo_proinde.png'
    },
    {
      image: 'logo_qgmi.png'
    },
    {
      image: 'logo_seashore_solutions.png'
    },
    {
      image: 'logo_ship_mede_care.png'
    },
    {
      image: 'logo_spring_marine.png'
    },
    {
      image: 'logo_unimar.png'
    },
    {
      image: 'logo_wilhelmsen.svg',
      customStyle: {
        'filter': 'drop-shadow(1px 1px 2px white)'
      }
    },
    {
      image: 'logo_wilson_sons.png'
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

  applyFilter(cliente: Cliente): object {
    if(cliente.customStyle){
      return cliente.customStyle;
    } else {
      return {};
    }
  }

  public async removeImageBackground(image: any) {
    const backgroundColor = { red: 255, green: 255, blue: 255 };
    const threshold = 10;
  
    const imageElement = new Image();
    imageElement.src = image;
    await new Promise(function(resolve) { imageElement.addEventListener('load', resolve); });
  
    var canvas = document.createElement('canvas');
    canvas.width = imageElement.naturalWidth;
    canvas.height = imageElement.naturalHeight;
  
    var ctx = canvas.getContext('2d');
    ctx!.drawImage(imageElement, 0, 0);
    const imageData = ctx!.getImageData(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < imageData.data.length; i += 4) {
      const red = imageData.data[i];
      const green = imageData.data[i + 1];
      const blue = imageData.data[i + 2];
      if (Math.abs(red - backgroundColor.red) < threshold &&
        Math.abs(green - backgroundColor.green) < threshold &&
        Math.abs(blue - backgroundColor.blue) < threshold) {
        imageData.data[i + 3] = 0;
      }
    }
  
    ctx!.putImageData(imageData, 0, 0);
    return canvas.toDataURL(`image/png`);
  }

}
