import React, {useEffect, useState} from 'react'
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { Header } from '../components';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Selection, Inject, Edit, Toolbar, Sort, Filter, Search } from '@syncfusion/ej2-react-grids';
import { materialList, materialDefinitionList,contextMenuItems } from '../data/dummy';
import { ComboBoxComponent } from '@syncfusion/ej2-react-dropdowns';
import { GetCities,GetCounties,GetDistrictList,SearchBuildingDamage } from '../service/service';
import Loader from '../components/Loader';

const BuildingDamageDetection = () => {
    const selectionsettings = { persistSelection: true };
    const toolbarOptions = ['Search'];
    const editing = { allowDeleting: true, allowEditing: true };

    const searchOptions = {
        fields: ['sokak'],
        ignoreCase: true,
        key: '',
        operator: 'contains',
        placeholder:'asd'
    };

    const [loading, setLoading] = useState(false)
    const [cityList, setCityList] = useState([])
    const [countyList, setCountyList] = useState([])
    const [districtList, setDistrictList] = useState([])
    const [selectedCity, setSelectedCity] = useState(null)
    const [selectedCounty, setSelectedCounty] = useState(null)
    const [selectedDistrict, setSelectedDistrict] = useState(null)
    const [streetNumber, setStreetNumber] = useState("")
    const [buildingNumber, setBuildingNumber] = useState("")
    const [damagedBuildingList, setDamagedBuildingList] = useState([])

    useEffect(() => {
        async function pageLoad(){
            setLoading(true)
            let cities = await GetCities()
            setCityList(cities.items)
            setLoading(false)
        }
        pageLoad()
     
    
    }, [])

    const getCountyList = async(e) =>{
        setLoading(true)
        console.log("seçilen il", e)
        setSelectedCity(e.value)
        let counties = await GetCounties(e.value)
        console.log("🚀 ~ file: BuildingDamageDetection.jsx:39 ~ getCountyList ~ counties", counties)
        setCountyList(counties.items)
        setLoading(false)
    }

    const getDistrictList = async(e) =>{
        setLoading(true)
        console.log("seçilen ilçe", e)
        setSelectedCounty(e.value)
        let districtData = await GetDistrictList(e.value)
        console.log("🚀 ~ file: BuildingDamageDetection.jsx:39 ~ GetDistrictList ~ GetDistrictList", districtData)
        setDistrictList(districtData.items)
        setLoading(false)
    }
    

    const searchBuildingDamage = async () => {
        if (!selectedCity || !selectedCounty || !selectedDistrict) {
            alert("Lütfen il ilçe ve mahalleyi seçiniz");
            return null;
        }
        setLoading(true)
        let damagedBuildings = await SearchBuildingDamage(2, selectedCity, selectedCounty, selectedDistrict, streetNumber, buildingNumber)
        console.log("🚀 ~ file: BuildingDamageDetection.jsx:59 ~ searchBuildingDamage ~ damagedBuildings", damagedBuildings)
        setDamagedBuildingList(damagedBuildings.liste)
        setLoading(false)

    }

    const customizeCell = (args) => {
        console.log("🚀 ~ file: BuildingDamageDetection.jsx:73 ~ customizeCell ~ args", args)
        if (args.column.field === "durum" && args.data) {
            if (args.data.durum === "Hasarsız") {
                args.cell.style.color = 'green';
            }
            else if (args.data.durum === "Az Hasarlı") {
                args.cell.style.color = 'yellow';
            }
            else if (args.data.durum === "Tespit Yapılamadı") {
                args.cell.style.color = 'gray';
            }
            else {
                args.cell.style.color = 'red';
            }
            
        }
    };

    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header category="" title="Bina Hasar Tespit Sistemi" />
            <ComboBoxComponent
                id='comboelement'
                dataSource={cityList}
                placeholder="İl Seçiniz"
                allowCustom={true}
                fields={{ text: 'ad', value: 'id' }}
                onChange={getCountyList}
            />

            <ComboBoxComponent
                id='comboelement'
                dataSource={countyList}
                placeholder="İLçe Seçiniz"
                fields={{ text: 'ad', value: 'id' }}
                onChange={getDistrictList}
            />
            <ComboBoxComponent
                id='comboelement'
                dataSource={districtList}
                placeholder="Mahalle Seçiniz"
                fields={{ text: 'ad', value: 'id' }}
                onChange={(e) => { setSelectedDistrict(e.value) }}
            />
            <TextBoxComponent placeholder="Sokak" floatLabelType="Auto" onChange={(e)=>setStreetNumber(e.value)} />
            <TextBoxComponent placeholder="Bina No" floatLabelType="Auto" onChange={(e)=>setBuildingNumber(e.value)} />

            <div>
                <button style={{ padding: '1%', backgroundColor:'green', color:'white', borderRadius:5,  fontSize:'1rem' }} onClick={searchBuildingDamage}>Sorgula</button>
            </div>

            <div style={{ marginTop: '3%' }}>
                <div><span style={{fontSize:'0.7rem'}}>Sokak bazında filtreleme yapmak için sağ taraftarki search kısmına sokağınızı yazıp büyütece tıklayın</span></div>
                <GridComponent
                    dataSource={damagedBuildingList}
                    enableHover={false}
                    allowPaging
                    allowSorting
                    allowExcelExport
                    allowPdfExport
                    contextMenuItems={contextMenuItems}
                    pageSettings={{ pageCount: 5 }}
                    selectionSettings={selectionsettings}
                    toolbar={toolbarOptions}
                    editSettings={editing}
                    searchSettings={searchOptions}
                    queryCellInfo={customizeCell}
                >
                    <ColumnsDirective>
                        <ColumnDirective field='il' width='100' headerText='İl' />
                        <ColumnDirective field='ilce' width='100' headerText='İlçe' />
                        <ColumnDirective field='mahalle' width='100' headerText='Mahalle' />
                        <ColumnDirective field='sokak' width='100' headerText='Sokak' />
                        <ColumnDirective field='binaNo' width='100' headerText='Bina No' />
                        <ColumnDirective field='deprem_adi' width='100' headerText='Afet Adı' />
                        <ColumnDirective field='durum' width='100' headerText='Bina Durumu' />
                    </ColumnsDirective>
                    <Inject services={[Page, Selection, Toolbar, Edit, Sort, Filter, Search]} />
                </GridComponent>
            </div>

            <Loader isLoading={loading} />
        </div>
    )
}

export default BuildingDamageDetection