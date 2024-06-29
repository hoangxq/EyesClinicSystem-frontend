import React, { useEffect } from "react";
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { changeLanguage } from "src/actions/user";
import i18n from "src/services/i18n";
import { withNamespaces } from "react-i18next";

const TheHeaderDropdownLang = ({ t }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const onClick = (language) => {
    dispatch(changeLanguage(language));

    let data = window.localStorage.getItem(
      `${process.env.REACT_APP_PREFIX_LOCAL}_user`
    );
    data = JSON.parse(data);
    data.language = language;
    window.localStorage.setItem(
      `${process.env.REACT_APP_PREFIX_LOCAL}_user`,
      JSON.stringify(data)
    );

    i18n.changeLanguage(language);
  };

  useEffect(() => {
    dispatch(changeLanguage("vi"));
  }, []);

  return (
    <CDropdown inNav className="c-header-nav-item mx-2" direction="down">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        {user && user.data.language === "vi" ? (
          <CIcon name="cif-vn" />
        ) : user && user.data.language === "en" ? (
          <CIcon name="cif-us" />
        ) : null}
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem onClick={() => onClick("vi")}>
          <div>
            <CIcon name="cif-vn" /> &nbsp; {t("Vietnamese")}
          </div>
        </CDropdownItem>

        <CDropdownItem onClick={() => onClick("en")}>
          <div>
            <CIcon name="cif-us" /> &nbsp; {t("English")}
          </div>
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default withNamespaces()(TheHeaderDropdownLang);
