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
      image: 'logo_br.png'
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
      image: 'logo_iss_shipping.png'
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
      image: 'logo_wilhelmsen.png'
    },
    {
      image: 'logo_wilson_sons.png'
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
