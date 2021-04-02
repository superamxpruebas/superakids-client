import React, { useState, useEffect } from "react";
import AccountDetails from "./AccountDetails";
import { LinkContainer } from "react-router-bootstrap";
//aqui no quitar imports no usados
import {
	Navbar,
	Nav,
	Container,
	Form,
	InputGroup,
	DropdownButton,
	Dropdown,
	Image
} from "react-bootstrap";
import { Sidebar } from "primereact/sidebar";
import { Chips } from "primereact/chips";
import { InputText } from "primereact/inputtext";
import { normalizeAccents } from "../helpers/Functions";
import { AppLogoUrl } from "../helpers/AppProps";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
	//ui state
	const [sideBar, setSideBar] = useState({ visible: false });

	const therapistLogin = useSelector((state) => state.therapistLogin);
	const { therapistInfo } = therapistLogin;

	const [userSearch, setUserSearch] = useState("");
	const [barUsers, setBarUsers] = useState([]);
	const [disableBarUsers, setDisableBarUsers] = useState(true);

	const chipsPlaceholderDefault = "Seleccionar usuario para trabajar...";
	const [chipValue, setChipValue] = useState([]);
	const [chipsPlaceholder, setChipsPlaceholder] = useState(chipsPlaceholderDefault);

	useEffect(() => {
		//data
		//aqui despues
		const users = [
			{
				userId: 1,
				fullName: "Josué Israel Morales Ornelas",
				img: "http://placehold.jp/180x180.png"
			},
			{
				userId: 2,
				fullName: "Josué Israel Baca Hernandez",
				img: "http://placehold.jp/180x180.png"
			},
			{
				userId: 3,
				fullName: "Diego Morales Manzanera",
				img: "http://placehold.jp/180x180.png"
			},
			{
				userId: 4,
				fullName: "Isaias Morales Ornelas",
				img: "http://placehold.jp/180x180.png"
			},
			{
				userId: 5,
				fullName: "áé íó üúú Morales Ornelas",
				img: "http://placehold.jp/180x180.png"
			}
		];
		setBarUsers(
			users.filter((user) => {
				return (
					user.userId.toString() === userSearch ||
					normalizeAccents(user.fullName.toLowerCase()).indexOf(
						normalizeAccents(userSearch.toLowerCase())
					) >= 0
				);
			})
		);
	}, [userSearch]); //aqui se va a agregar "users" al array, para que se actualice cuando cambie

	const setSessionUser = ({ userId, fullName }) => {
		//aqui llama a algo para hacerlo global, redux? (falta)

		//update ui
		setChipsPlaceholder("");
		setDisableBarUsers(false); //aqui no se si agregarle un useeffect para detectar cambio de valor (o sea ya funciona, pero no se)
		setChipValue([fullName]);
		setUserSearch("");
	};

	const removeSessionUser = () => {
		//aqui falta - llama al estado global a quitarlo

		//update ui
		setChipsPlaceholder(chipsPlaceholderDefault);
		setDisableBarUsers(true);
	};

	return (
		<header>
			<Navbar expand="lg" collapseOnSelect>
				<Container>
					<LinkContainer to="/">
						<Navbar.Brand>
							<img
								alt="Logo"
								src={AppLogoUrl}
								style={{
									height: "50px"
								}}
							></img>
						</Navbar.Brand>
					</LinkContainer>
					<Nav className="ml-auto justify-content-end">
						{/*<Form inline className="mr-4">
							<InputGroup>
								<InputGroup.Prepend>
									<InputGroup.Text
										id="basic-addon1"
										style={{
											borderBottomLeftRadius: "2rem",
											borderTopLeftRadius: "2rem"
										}}
									>
										<i className="fas fa-user-circle"></i>
									</InputGroup.Text>
								</InputGroup.Prepend>
								<Chips
									placeholder={chipsPlaceholder}
									max={1}
									disabled={disableBarUsers}
									value={chipValue}
									onChange={(e) => setChipValue(e.value)}
									onRemove={(e) => removeSessionUser()}
									style={{
										minWidth: "300px",
										maxWidth: "300px"
									}}
								/>
								<DropdownButton
									as={InputGroup.Append}
									variant="outline-secondary"
									title=""
									drop="down"
									menuAlign="right"
									id="input-group-dropdown-2"
								>
									<Dropdown.ItemText>
										<span className="p-input-icon-left">
											<i className="pi pi-search" />
											<InputText
												style={{ minWidth: "100%" }}
												value={userSearch}
												onChange={(e) => setUserSearch(e.target.value)}
												placeholder="Buscar usuario por nombre o ID..."
											/>
										</span>
									</Dropdown.ItemText>
									{barUsers.map((user) => (
										<Dropdown.Item
											as="button"
											onClick={(e) => {
												e.preventDefault();
												setSessionUser(user);
											}}
											key={user.userId}
										>
											<Image
												src={user.img}
												roundedCircle
												style={{
													maxWidth: "50px",
													maxHeight: "50px",
													marginRight: "10px"
												}}
											/>{" "}
											{user.fullName}
										</Dropdown.Item>
									))}
								</DropdownButton>
							</InputGroup>
						</Form>*/}
						<Nav.Link onClick={(e) => setSideBar({ visible: true })}>
							<i className="far fa-user"></i> Cuenta
						</Nav.Link>
					</Nav>
				</Container>
			</Navbar>
			<Sidebar
				visible={sideBar.visible}
				position="right"
				onHide={() => setSideBar({ visible: false })}
				closeOnEscape={false}
			>
				<AccountDetails therapistInfo={therapistInfo} />
			</Sidebar>
		</header>
	);
};

export default Header;
