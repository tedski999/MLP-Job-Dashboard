import React from "react";
// import '@coreui/coreui/dist/css/coreui.min.css';
//import 'bootstrap/dist/css/bootstrap.min.css';
import { CListGroup } from '@coreui/react';
import { CListGroupItem } from '@coreui/react';

function JobsList(){
	return <div className="Jobs-List">
        JOBS LIST PAGE
		<CListGroup>
			<CListGroupItem component="a" href="#" active>
				Cras justo odio
			</CListGroupItem>
			<CListGroupItem component="a" href="#">
				Dapibus ac facilisis in
			</CListGroupItem>
			<CListGroupItem component="a" href="#">
				Morbi leo risus
			</CListGroupItem>
			<CListGroupItem component="a" href="#">
				Porta ac consectetur ac
			</CListGroupItem>
			<CListGroupItem component="a" href="#" disabled>
				Vestibulum at eros
			</CListGroupItem>
		</CListGroup>
	</div>;
}
export default JobsList;
